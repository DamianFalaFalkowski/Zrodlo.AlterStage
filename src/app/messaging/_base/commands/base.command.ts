import { APIInteractionGuildMember, ChatInputCommandInteraction, GuildMember, GuildMemberRoleManager, Role } from "discord.js";
import dcLogger from "../../../utils/dc-logger.util";
import { NotImplementedError } from "../../../Errors/not-implemented-error";
import { BaseCommandResponse } from "./base.response";

/** 
    Klasa do sprawdzania uprawnień i poprawności polecenia i praetrzymywania informacji o poleceniu.
 */
export class BaseCommand<R extends BaseCommandResponse> {

    // chronione
    public Response: R | undefined;
    public readonly InteractingMember: APIInteractionGuildMember | GuildMember;
    public readonly InteractingMemberRoleNames: string[];
    protected readonly isEphemeral: boolean = false;

    // publiczne
    public IsSucess: boolean = false;
    public readonly Interaction: ChatInputCommandInteraction | any | undefined;
    public readonly AllGuildRoles: Role[] | undefined;
    public readonly Definition: any | undefined;
    public readonly IsEphemeral: boolean | undefined;
    public readonly AllowedRoles: string[] | undefined;

    // Konstruktor będący mapperem interakcji na komendę
    constructor(interaction: ChatInputCommandInteraction) {
        try {
            this.Definition = module.require(`./../../handlers/${interaction.commandName}/${interaction.commandName}.definition`);
            this.IsEphemeral = this.Definition.isEphemeral;
            this.AllowedRoles = this.Definition.allowedRoles;
            if (!interaction) throw new Error('Invalid Command. Missing interaction.');
            if (!interaction.isCommand()) throw new Error('Invalid Command. Interaction is not a command.');
            if (!interaction.member) throw new Error('Invalid Command. Missing member.');
            this.InteractingMember = interaction.member;
            if (this.AllowedRoles === undefined || this.AllowedRoles === null || this.AllowedRoles.length === 0)
                throw new Error('Invalid Command. Missing allowedRoles.');
            this.InteractingMemberRoleNames = (this.InteractingMember.roles as GuildMemberRoleManager).cache.map((role: Role) => role.name);
            this.Interaction = interaction;
            this.AllGuildRoles = this.Interaction?.guild!.roles.cache.map((role: Role) => role);
            this.Response = this.CreateResponseObject();

            this.CheckAuthorisationAndValidity();
        } catch (error) {
            dcLogger.logError(error as Error);
            throw error;
        }
    }

    // sprawdzanie czy base command moze byc wykonany
    public CheckAuthorisationBase(): boolean {
        try {
            // czy interakcja dotyczy polecenia
            if (!this.Interaction!.isCommand()) this.Response!.PepeareFailureResponseBase("Passed interaction is not a command interaction");

            // sprawdzenie uprawnień dot. ról
            if (!this.InteractingMemberRoleNames
                .some(roleName => this.AllowedRoles!
                    .includes(roleName))) {
                this.IsSucess = false;
                this.Response!.PepeareFailureResponseBase('Invalid command. Brak uprawnień do uruchomienia tego polecenia.');
            }
            // czy uzytkownik utworzył interakcję
            const member = this.Interaction!.member;
            if (!member) {
                this.Response!.PepeareFailureResponseBase('Brak uprawnień do uruchomienia tego polecenia.');
                return false;
            }
            return this.CheckAuthorisationAndValidity();
        } catch (error) {
            dcLogger.logError(error as Error);
            throw error;
        }
    }

    public CheckAuthorisationAndValidity(): boolean {
        throw new NotImplementedError();
    }

    public CreateResponseObject(): R {
        throw new NotImplementedError();
    }
}
