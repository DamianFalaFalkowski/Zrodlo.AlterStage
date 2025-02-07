import { APIInteractionGuildMember, ChatInputCommandInteraction, GuildMember, GuildMemberRoleManager, MessageFlags, Role } from "discord.js";
import { BaseCommandResponse } from "./base-command-response";

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
    public readonly Interaction: ChatInputCommandInteraction;
    public readonly AllGuildRoles: Role[];

    // Konstruktor będący mapperem interakcji na komendę
    constructor(interaction: ChatInputCommandInteraction, allowedRoles: string[], initialResponse: R) {
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
        this.CheckAuthorisation();
    }

    // sprawdzanie czy base command moze byc wykonany
    public CheckAuthorisation(): boolean {
        if (!this.InteractingMemberRoleNames.some(roleName => this._allowedRoles.includes(roleName))) {
            this.IsSucess = false;
            this.Response.prepeareFailureResponse('Invalid command. Brak uprawnień do uruchomienia tego polecenia.');
            return false;
        }
        return true;
    }

}