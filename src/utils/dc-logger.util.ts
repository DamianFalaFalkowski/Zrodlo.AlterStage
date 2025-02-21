import { CommandInteraction, InteractionReplyOptions } from 'discord.js';
import fs from 'fs';
import { format } from 'node:util';
import path from 'path';
import thisLine from './this-line.util';
export class DcLogger {
    private logFilePath: string;

    constructor() {
        this.logFilePath = path.join(__dirname, '../../logs/discord.log'); //TODO:WCHOJ:TODO tą siezkę trzeba KONIECZNIE zabrac do .env-a
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
            `[${timestamp}] ${format(message, ...optionalParams)}`
            : `[${timestamp}] ${message}`;

        fs.appendFileSync(this.logFilePath, `[${timestamp}] ${formattedMessage}\n`);
        console.log(formattedMessage);
    }

    public logDebug(e: Error, message: string, ...optionalParams: any[]) {
        const msg = `[DBG]: ${message} => ${thisLine(e)}`
        if (optionalParams.length > 0)
            this.log(msg, ...optionalParams);
        else
            this.log(msg);
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