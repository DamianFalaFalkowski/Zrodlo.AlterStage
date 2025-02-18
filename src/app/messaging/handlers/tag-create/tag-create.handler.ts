import { TagsRepository } from '../../../../model/tags.model';
import dcLogger from '../../../utils/dc-logger.util';
import { GenerateTransferMessageCommand } from '../gen-transfer-msg/gen-transfer-msg.command';
import { GenerateTransferMessageResponse } from '../gen-transfer-msg/gen-transfer-msg.response';

// TODO: upewnic sie ze wszystko jest ok
// TODO: dodac komentarze
// TODO: dodac logowanie

module.exports = {
    _baseHandler: require('./../c_command-handling-base/base.handler'),
     async handle(interaction: any, command: GenerateTransferMessageCommand, response: GenerateTransferMessageResponse) {
        try {
            const { commandName } = interaction;
            
                if (commandName === interaction.commandName) {
                    const tagName = interaction.options.getString('name');
                    const userId = interaction.options.getUser('user-id')?.id;
                    const tagDescription = interaction.options.getString('description');
            
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
                            createdUserId: interaction.user.id
                        });
                        return response!.PrepeareSuccessResponseBase("Tag added!");
                    }
                    catch (error: Error | any) {
                        if (error.name === 'SequelizeUniqueConstraintError') {
                            response!.PepeareFailureResponseBase(error.message === null ? 'That tag already exists.': error.message);
                        }
                        response!.PepeareFailureResponseBase(error.message === null ? 'Something went wrong with adding a tag.': error.message);
                    }
                }
                else
                response!.PepeareFailureResponseBase(`Nierozpoznana nazwa polecenia: ${commandName}`);
            
                // Odeślij odpowiedź
                await interaction.reply(dcLogger.logReplyAndReturn(interaction, response!.Reply));
        } catch (error) {
            dcLogger.logError(error as Error);
            throw error;
        }
    }
}