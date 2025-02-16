import { APIInteractionGuildMember, GuildMember, GuildMemberRoleManager, Role } from "discord.js";
import dcLogger from "../../../utils/dc-logger";
import { BaseCommandResponse } from "./base.response";

export class BaseCommand<R extends BaseCommandResponse> {

    // prywatne
    private readonly _allowedRoles: string[];

    // chronione
    public readonly Response: R;
    public readonly InteractingMember: APIInteractionGuildMember | GuildMember;
    public readonly InteractingMemberRoleNames: string[];
    protected readonly isEphemeral: boolean = false;

    // publiczne
    public IsSucess: boolean = false;
    public readonly Interaction: any;
    public readonly AllGuildRoles: Role[];

    // Konstruktor będący mapperem interakcji na komendę
    constructor(interaction: any, allowedRoles: string[], initialResponse: R) {
        try {
            if (!interaction) throw new Error('Invalid Command. Missing interaction.');
            if (!interaction.isCommand()) throw new Error('Invalid Command. Interaction is not a command.');
            if (!interaction.member) throw new Error('Invalid Command. Missing member.');
            this.InteractingMember = interaction.member;
            if (allowedRoles === undefined || allowedRoles === null || allowedRoles.length === 0)
                throw new Error('Invalid Command. Missing allowedRoles.');
            this._allowedRoles = allowedRoles;
            this.InteractingMemberRoleNames = (this.InteractingMember.roles as GuildMemberRoleManager).cache.map((role: Role) => role.name);
            this.Interaction = interaction;
            this.AllGuildRoles = this.Interaction.guild!.roles.cache.map((role: Role) => role);

            this.Response = initialResponse;
            //this.CheckAuthorisation(); // TODO: sprawdzic
        } catch (error) {
            dcLogger.logError(error as Error);
            throw error;
        }
    }

    // sprawdzanie czy base command moze byc wykonany
    public CheckAuthorisation(): boolean {
        try {
            if (!this.InteractingMemberRoleNames.some(roleName => this._allowedRoles.includes(roleName))) {
                this.IsSucess = false;
                this.Response.prepeareFailureResponse('Invalid command. Brak uprawnień do uruchomienia tego polecenia.');
                return false;
            }
            return true;
        } catch (error) {
            dcLogger.logError(error as Error);
            throw error;
        }
    }

}