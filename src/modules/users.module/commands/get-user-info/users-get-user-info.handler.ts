import { Readable } from "stream";
import { UserRepository } from "../../../../data/model/sch.users/repositories/user.repository";
import { __logger } from "../../../../utils/dc-logger.util";
import { ftpFileGet } from "../../../../utils/ftp-file-upload.util";
import { GetUserInfoCommand } from "./users-get-user-info.command";

/** Metoda obsługująca polecenie */
module.exports = {
    async handle(interaction: any, command: GetUserInfoCommand): Promise<void>
    {
        let userEntity = await UserRepository.findByDiscordUserId(command.UserIdentifier);
        let userActionLogs = await userEntity?.getActionLogs();

        const ftpFilePath = process.env.FTP_PATH + '/' + command.UserIdentifier + '.jpg';
        let photoStream = await ftpFileGet(
            process.env.FTP_HOST!,
            process.env.FTP_PORT! as unknown as number,
            process.env.FTP_USER!,
            process.env.FTP_PASSWORD,
            ftpFilePath);

        if (photoStream instanceof Readable)
        {
            command.Response.AssignResponseData(userEntity!, userActionLogs!, photoStream! as Readable);
            command.Response.PrepeareSuccessResponseBase();
        }


    }
};