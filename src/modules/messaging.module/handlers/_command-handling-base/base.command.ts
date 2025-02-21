import { APIInteractionGuildMember, ChatInputCommandInteraction, GuildMember, GuildMemberRoleManager, Role } from "discord.js";
import dcLogger from '../../../../utils/dc-logger.util';import { BaseCommandResponse } from "./base.response";
import { BaseCommandDefinition } from "./base.definition.interface";

// TODO: dodać komentarze
// TODO: dodać logowanie

/** Klasa do: 
 - przetrzymywania informacji o poleceniu 
 - sprawdzania uprawnień uutkowników i poprawności polecenia
 */
export abstract class BaseCommand<R extends BaseCommandResponse> {
// Metody do implementacji w klasach dziedziczących
    /** */
    protected abstract CheckAuthorisationAndValidity(): boolean;

// Zmienne publiczne
    public get IsEphemeral(): boolean { return this.isEphemeral;}
    public readonly AllowedRoles: string[];
    public readonly AllGuildRoles: Role[];

// Zmienne chronione
    protected readonly Response: R;
    protected readonly isEphemeral: boolean;
    protected readonly Interaction: ChatInputCommandInteraction;
    protected readonly InteractingMember: APIInteractionGuildMember | GuildMember;
    protected readonly InteractingMemberRoleNames: string[];

// Zmienne prywatne
    private readonly Definition: BaseCommandDefinition;

    // Konstruktor będący mapperem interakcji na komendę
    constructor(interaction: ChatInputCommandInteraction, response: R) {
        try {
            this.Definition = module.require(`./../../handlers/${interaction.commandName}/${interaction.commandName}.definition`);
            this.isEphemeral = this.Definition.isEphemeral;
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
            this.Response = response;

            this.CheckAuthorisationAndValidity();
        } catch (error) {
            dcLogger.logError(error as Error);
            throw error;
        }
    }

    // sprawdzanie czy base command moze byc wykonany
    protected CheckAuthorisationAndValidityBase(): boolean {
        try {
            // czy interakcja dotyczy polecenia
            if (!this.Interaction!.isCommand()) this.Response.PepeareFailureResponseBase("Passed interaction is not a command interaction");

            // sprawdzenie uprawnień dot. ról
            if (!this.InteractingMemberRoleNames
                .some(roleName => this.AllowedRoles!
                    .includes(roleName))) {
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
}


