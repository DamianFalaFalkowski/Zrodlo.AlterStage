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

    private log(message: string) {
        const timestamp = new Date().toISOString();
        const formattedMessage = `[${timestamp}] ${message}`;
        fs.appendFileSync(this.logFilePath, `${formattedMessage}\n`);
        console.log(formattedMessage);
    }

    public logToFile(message: string) {
        this.log(message);
    }

    public logWarning(message: string) {
        this.log("WARN: "+message);
    }

    public logCommand(interaction: CommandInteraction) {
        const user = interaction.user.tag;
        const commandName = interaction.commandName;
        const options = interaction.options.data.map(option => `${option.name}: ${option.value}`).join(', ');
        const logMessage = `Command executed by ${user}: /${commandName} ${options}`;
        this.logToFile(logMessage);
    }

    public logReplyAndReturn(interaction: CommandInteraction, reply: InteractionReplyOptions): InteractionReplyOptions {
        const user = interaction.user.tag;
        const replyContent = reply.content || 'No content';
        const logMessage = `Reply to ${user}: ${replyContent}`;
        this.logToFile(logMessage);
        return reply;
    }

    public logError(error: Error) {
        const logMessage = `ERROR: ${error.message}\nStack: ${error.stack}`;
        this.logToFile(logMessage);
    }

    public logStringError(error: string) {
        const logMessage = `ERROR: ${error}`;
        this.logToFile(logMessage);
    }
}

export default new DcLogger();