import { CommandInteraction, InteractionReplyOptions } from 'discord.js';
import fs from 'fs';
import path from 'path';
import { __util } from '../startup';
export class DcLogger {
    private logFilePath: string;

    constructor() {
        this.logFilePath = path.join(__dirname, '../../../logs/discord.log');
        this.ensureLogFileExists();
    }

    private ensureLogFileExists() {
        if (!fs.existsSync(this.logFilePath)) {
            fs.writeFileSync(this.logFilePath, '', { flag: 'wx' });
        }
    }

    private log(message: string, ...optionalParams: any[]) {
        const timestamp = new Date().toISOString();
        const formattedMessage = optionalParams.length > 0 ?
            `[${timestamp}] ${__util.format(message, ...optionalParams)}`
            : `[${timestamp}] ${message}`;

        fs.appendFileSync(this.logFilePath, `[${timestamp}] ${formattedMessage}\n`);
        console.log(formattedMessage);
    }

    public logInfo(message: string, ...optionalParams: any[]) {
        if (optionalParams.length > 0)
            this.log(message, ...optionalParams);
        else
            this.log(message);
    }

    public logWarning(message: string, ...optionalParams: any[]) {
        this.log("WARN: " + message, ...optionalParams);
    }

    public logCommand(interaction: CommandInteraction) {
        const user = interaction.user.tag;
        const commandName = interaction.commandName;
        const options = interaction.options.data.map(option => `${option.name}: ${option.value}`).join(', ');
        const logMessage = `Command executed by ${user}: /${commandName} ${options}`;
        this.logInfo(logMessage);
    }

    public logReplyAndReturn(interaction: CommandInteraction, reply: InteractionReplyOptions): InteractionReplyOptions {
        const user = interaction.user.tag;
        const replyContent = reply.content ?? 'No content';
        const logMessage = `Reply to ${user}: ${replyContent}`;
        this.logInfo(logMessage);
        return reply;
    }

    public logError(error: Error) {
        const logMessage = `ERROR: ${error.message}\nStack: ${error.stack}`;
        this.logInfo(logMessage);
    }

    public logStringError(error: string, ...optionalParams: any[]) {
        const logMessage = `ERROR: ${error}`;
        this.logInfo(logMessage, ...optionalParams);
    }
}

export default new DcLogger();