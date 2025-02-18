import { TagsRepository } from '../../../../model/tags.model';
import dcLogger from '../../../utils/dc-logger.util';
import { BaseCommandHandler } from '../../_base/base.handler';
import { TagCreateCommand } from './tag-create.command';
export class TagCreateHandler extends BaseCommandHandler<TagCreateCommand>{
    
    constructor(command: TagCreateCommand) {
        super(command);
    }

     override async handle() {
        try {
            const { commandName } = this.command.Interaction;
            
                if (commandName === this.command.Interaction.commandName) {
                    const tagName = this.command.Interaction.options.getString('name');
                    const userId = this.command.Interaction.options.getUser('user-id')?.id;
                    const tagDescription = this.command.Interaction.options.getString('description');
            
                    try {
                        if ((await TagsRepository.findAll({
                            where: {
                                name: tagName,
                                userId: userId
                            }
                        })).length > 0) {
                            let err = new Error(`Tag with name: ${tagName} and userId: ${userId} already exists.`);
                            err.name = "SequelizeUniqueConstraintError";
                            throw err;
                        }
            
                        // equivalent to: INSERT INTO tags (name, description, username) values (?, ?, ?);
                        let tag: TagsRepository = await TagsRepository.create({
                            name: tagName,
                            description: tagDescription,
                            userId: userId,
                            createdUserId: this.command.Interaction.user.id
                        });
                        this.command.Response!.PrepeareSuccessResponseBase();
                    }
                    catch (error: Error | any) {
                        if (error.name === 'SequelizeUniqueConstraintError') {
                            this.command.Response!.PepeareFailureResponseBase(error.message === null ? 'That tag already exists.': error.message);
                        }
                        this.command.Response!.PepeareFailureResponseBase(error.message === null ? 'Something went wrong with adding a tag.': error.message);
                    }
                }
                else
                this.command.Response!.PepeareFailureResponseBase(`Nierozpoznana nazwa polecenia: ${commandName}`);
            
                // Odeślij odpowiedź
                await this.command.Interaction.reply(dcLogger.logReplyAndReturn(this.command.Interaction, this.command.Response!.Reply));
        } catch (error) {
            dcLogger.logError(error as Error);
            throw error;
        }
    }
}