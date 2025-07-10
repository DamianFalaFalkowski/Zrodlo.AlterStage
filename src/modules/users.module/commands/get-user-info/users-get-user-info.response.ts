import { Attachment, AttachmentBuilder, InteractionReplyOptions } from "discord.js";
import { BaseCommandResponse } from "../../../../discord/_command-handling-base/base.response";
import { __logger } from "../../../../utils/dc-logger.util";
import { UserEntity } from "../../../../data/model/sch.users/entities/user.entity";
import { UserActionLogEntity } from "../../../../data/model/sch.users/entities/user-action-log.entity";
import { ftpFileGet } from "../../../../utils/ftp-file-upload.util";
import { Readable } from "stream";

export class GetUserInfoResponse extends BaseCommandResponse
{
    private user?: UserEntity;
    private userActionLogs?: UserActionLogEntity[];
    private photoStream?: NodeJS.ReadableStream;

    constructor(isEphemeral: boolean)
    {
        super(isEphemeral);
    }

    public AssignResponseData(user: UserEntity, userActionLogs: UserActionLogEntity[], photoStream: Readable)
        : void
    {
        this.user = user;
        this.userActionLogs = userActionLogs;
        this.photoStream = photoStream;
    }

    // sprawdzenie czy komponent został poprawnie zbudowany oraz czy jest kompletny
    protected override EnsureReadyAndValid()
        : boolean 
    {
        try
        {
            if (!(this.user instanceof UserEntity) ||
                !(this.userActionLogs instanceof Array))
                return false;
            return true;
        } catch (error)
        {
            __logger.logError(error as Error);
            throw error;
        }
    }

    public override PepeareFailureResponse(reply: InteractionReplyOptions)
        : InteractionReplyOptions 
    {
        try
        {
            reply.content = `Uzytkownik o podanym identyfikatorze nie zostal odnaleziony lub dane sa niedostepne. \nSpróbuj ponownie później lub skontaktuj się z administratorem.`;
        } catch (error)
        {
            __logger.logError(error as Error);
        }
        return reply;
    }

    public override PrepeareSuccessResponse(reply: InteractionReplyOptions)
        : InteractionReplyOptions 
    {
        reply.files =
            [new AttachmentBuilder(this.photoStream as Readable, { name: 'image.jpg', description: 'Przykładowy obrazek' })];
        reply.content = `
            USER INFO: ${this.user!.lastUserDiscordName}(${this.user!.userDiscordId})\n\n\t
            ${this.userActionLogs!.map(log =>
            `[${log.isOutdated ? 'OUTDATED' : 'ACTIVE'}] userDiscordId(${log.actionDate} userDiscordId): ${log.logMessage} ${log.isOutdated || log.outdatesAfter != null ? `=> (${log.outdatesAfter}` : ''}`).join('\n\t')}`;
        return reply;
    }
}