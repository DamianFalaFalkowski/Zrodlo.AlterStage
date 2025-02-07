import { APIInteractionGuildMember, ChatInputCommandInteraction, GuildMember, GuildMemberRoleManager, MessageFlags, Role } from "discord.js";
import { BaseCommandResponse } from "./base-command-response";

export class BaseCommand<R extends BaseCommandResponse> {

    // prywatne
    private readonly _allowedRoles: string[];

    // chronione
    protected response: R;
    protected readonly interactingMember: APIInteractionGuildMember | GuildMember;
    protected readonly interactingMemberRoleNames: string[];
    protected readonly isEphemeral: boolean = false;

    // publiczne
    public IsSucess: boolean = false;

    // Konstruktor będący mapperem interakcji na komendę
    constructor(interaction: ChatInputCommandInteraction, allowedRoles: string[], initialResponse: R) {
        if (!interaction) throw new Error('Invalid Command. Missing interaction.');
        if (!interaction.member) throw new Error('Invalid Command. Missing member.');
        this.interactingMember = interaction.member;
        if (allowedRoles === undefined || allowedRoles === null || allowedRoles.length === 0)
            throw new Error('Invalid Command. Missing allowedRoles.');
        this._allowedRoles = allowedRoles;
        this.interactingMemberRoleNames = (this.interactingMember.roles as GuildMemberRoleManager).cache.map((role: Role) => role.name);

        this.response = initialResponse;
    }

    // sprawdzanie czy base command moze byc wykonany
    public CheckAuthorisation(): boolean {
        if (!this.interactingMemberRoleNames.some(roleName => this._allowedRoles.includes(roleName))) {
            this.IsSucess = false;
            this.response.prepeareFailureResponse('Invalid command. Brak uprawnień do uruchomienia tego polecenia.');
            return false;
        }
        return true;
    }

}