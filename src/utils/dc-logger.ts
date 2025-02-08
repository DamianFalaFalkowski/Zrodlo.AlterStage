import { CommandInteraction, InteractionReplyOptions } from 'discord.js';
import fs from 'fs';
import path from 'path';

export class DcLogger {
    private logFilePath: string;

    constructor() {
        this.logFilePath = path.join(__dirname, '../../logs/discord.log');
        this.ensureLogFileExists();
    }

    private ensureLogFileExists() {
        if (!fs.existsSync(this.logFilePath)) {
            fs.writeFileSync(this.logFilePath, '', { flag: 'wx' });
        }
    }

    private logToFile(message: string) {
        const timestamp = new Date().toISOString();
        fs.appendFileSync(this.logFilePath, `[${timestamp}] ${message}\n`);
    }

    public logCommand(interaction: CommandInteraction) {
        const user = interaction.user.tag;
        const commandName = interaction.commandName;
        const options = interaction.options.data.map(option => `${option.name}: ${option.value}`).join(', ');
        const logMessage = `Command executed by ${user}: /${commandName} ${options}`;
        this.logToFile(logMessage);
        console.log(logMessage);
    }

    public logReplyAndReturn(interaction: CommandInteraction, reply: InteractionReplyOptions): InteractionReplyOptions {
        const user = interaction.user.tag;
        const replyContent = reply.content || 'No content';
        const logMessage = `Reply to ${user}: ${replyContent}`;
        this.logToFile(logMessage);
        console.log(logMessage);
        return reply;
    }

    public logError(error: Error) {
        const logMessage = `Error: ${error.message}\nStack: ${error.stack}`;
        this.logToFile(logMessage);
        console.error(logMessage);
    }
}

export default new DcLogger();