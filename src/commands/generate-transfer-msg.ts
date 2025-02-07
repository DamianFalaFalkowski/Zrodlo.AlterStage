import { ActionRowBuilder, ButtonBuilder, ButtonStyle, MessageFlags, SlashCommandBuilder, ChatInputCommandInteraction, InteractionReplyOptions, GuildMemberRoleManager, APIInteractionGuildMember, BitFieldResolvable } from 'discord.js';
import dcLogger from '../utils/dc-logger';
import { BaseCommand } from '../prototype/base-command';
import { BaseChatInputCommandHandler } from '../prototype/base-chat-input-command-handler';
import { BaseCommandResponse } from '../prototype/base-command-response';

// Command
export class GenerateTransferMessageCommand extends BaseCommand<GenerateTransferMessageCommandResponse> {
    // command config
    public static readonly AllowedRoles = ['member', 'admin', 'moderator', 'owner', 'honored-member', 'super-moderator'];
    protected readonly isEphemeral: boolean;
    
    // Params
    roleToBuyName: string | undefined;

    // ctor with authorisation check
    constructor(interaction: ChatInputCommandInteraction, isEphemeral: boolean) {
        let tempRoleToBuy = interaction.options.data[0].role!.name;
        super(interaction, GenerateTransferMessageCommand.AllowedRoles, 
            new GenerateTransferMessageCommandResponse(isEphemeral, tempRoleToBuy));
        this.isEphemeral = isEphemeral;
        this.roleToBuyName = tempRoleToBuy;
        this.CheckAuthorisation();
    }

    // sprawdzenie czy GenerateTransferMessageCommand moze byc wykonany
    public CheckAuthorisation() : boolean {
        super.CheckAuthorisation();
        if (this.roleToBuyName === undefined || this.roleToBuyName === null || this.roleToBuyName.length === 0)
        {
            this.IsSucess = false;
            this.response.prepeareFailureResponse('Invalid command. Role to is buy missing.');
            return false;
        }
        return true;        
    }
}

export class GenerateTransferMessageCommandResponse extends BaseCommandResponse {

    protected generatedTransferMessage: string | null = null;
    protected roleToBuy: string;

    constructor(isEphemeral: boolean = false, roleToBuy: string) {
        super(isEphemeral);
        this.roleToBuy = roleToBuy;
    }

    // sprawdzenie czy komponent został poprawnie zbudowany oraz czy jest kompletny
    protected ensureReady(markReadyIfReady: boolean = true): boolean {
        if (super.ensureReady(false))
        // TODO: sprawdzenie czy zawiera przycisk do kopiowania
        {
            if (markReadyIfReady)
                this.IsReady = true;
            return true;
        }
        return false;
    }

    public prepeareFailureResponse(errorMessage: string) {
        // stuff can be done here
        super.prepeareFailureResponse(errorMessage);
    }

    public TryFinalize(generatedTransferMessage: string)
    {
        this.generatedTransferMessage = generatedTransferMessage;
        if(this.ensureReady()){
            this.prepeareSuccessResponse();
        }
        else {
            this.prepeareFailureResponse("Odpowiedź nie spełnia wymogów kompletności!");
        }
    }

    protected prepeareSuccessResponse() {      
        this._reply.content = `Aby dokonać zakupu produktu **${this.roleToBuy}** wklej tą wiadomość w tytule przelewu:\n\n **${this.generatedTransferMessage}**`

        // Utwórz przycisk do kopiowania
        const row = new ActionRowBuilder<ButtonBuilder>()
            .addComponents(new ButtonBuilder()
                .setCustomId('copy')
                .setLabel('Copy')
                .setStyle(ButtonStyle.Primary));
        this._reply.components = [row];
        super.prepeareSuccessResponse();
    }
}

export class GenerateTransferMessageCommandHandler<
    GenerateTransferMessageCommand extends BaseCommand<GenerateTransferMessageCommandResponse>, 
    GenerateTransferMessageCommandResponse extends BaseCommandResponse> 
        extends BaseChatInputCommandHandler<GenerateTransferMessageCommand, GenerateTransferMessageCommandResponse> 
{
    constructor() {
        super();
    }

    async handle(command: GenerateTransferMessageCommand) {

    }
}


export const execute = async (interaction: ChatInputCommandInteraction) => {

    dcLogger.logCommand(interaction);
    let reply: InteractionReplyOptions = { content: undefined, flags: MessageFlags.Ephemeral };

    if (!interaction.isCommand()) return;

    // Sprawdzenie czy uzytkownik na uprawnienia do uruchomienia polecenia
    const member = interaction.member;
    if (!member || !('roles' in member)) {
        reply.content = 'Brak uprawnień do uruchomienia tego polecenia.';
        return interaction.reply(dcLogger.logReplyAndReturn(interaction, reply));
    }
    const roles = (member.roles as GuildMemberRoleManager).cache;
    // if (!roles.some(role => allowedRoles.includes(role.name))) {
    //     reply.content = 'Brak uprawnień do uruchomienia tego polecenia.';
    //     return interaction.reply(dcLogger.logReplyAndReturn(interaction, reply));
    // }

    // Sprawdzenie czy przekazana rola istnieje w systemie ...
    if (interaction.guild!.roles.cache.find(role => role.name === interaction.options.data[0].role!.name) === undefined) {
        reply.content = 'Rola którą próbujesz zakupić nie istnieje w systemie.';
        return interaction.reply(dcLogger.logReplyAndReturn(interaction, reply));
    }

    // ... i czy jest rolą ozanczoną jako do kupienia
    if (interaction.options.data[0].role!.name.charAt(0) !== '+') {
        reply.content = 'Rola którą próbujesz zakupić nie jest przeznaczona do kupienia.';
        return interaction.reply(dcLogger.logReplyAndReturn(interaction, reply));
    }


    // rozpoczęcie generowania wiadomości
    let itemName = interaction.options.data.find((x: any) => x !== undefined)!.role!.name;
    let globalName = interaction.user.globalName!;
    let userId = interaction.user.id;
    let generatedTransferMessage = userId.toString() + ' ' + globalName.toString() + ' ' + itemName.toString();

    // Sprawdzenie czy generatedTransferMessage zawiera tylko dozwolone znaki
    const ValidRespMess = /[a-z A-Z0-9ąćęłńóśźżĄĆĘŁŃÓŚŹŻ()_=\-:'.?\/\\]+$/.test(generatedTransferMessage);
    if (!ValidRespMess) {
        // Jeśli tak to zastąp niedozwolone znaki podkreślnikiem
        generatedTransferMessage = generatedTransferMessage.replace(/[^a-z A-Z0-9ąćęłńóśźżĄĆĘŁŃÓŚŹŻ()_=\-:'.?\/\\]+/g, '_');
    }

    // Sprawdzenie czy generatedTransferMessage nie jest dłuższa niż 140 znaków
    if (generatedTransferMessage.length > 140) {
        // JHeśli tak to skróć generatedTransferMessage do 140 znaków
        generatedTransferMessage = generatedTransferMessage.substring(0, 140);
    }

    reply.content = `Aby dokonać zakupu produktu **${itemName.toString()}** wklej tą wiadomość w tytule przelewu:\n\n **${generatedTransferMessage}**`

    // Utwórz przycisk do kopiowania
    const row = new ActionRowBuilder<ButtonBuilder>()
        .addComponents(new ButtonBuilder()
            .setCustomId('copy')
            .setLabel('Copy')
            .setStyle(ButtonStyle.Primary));
    reply.components = [row];

    // Odeślij odpowiedź
    await interaction.reply(dcLogger.logReplyAndReturn(interaction, reply));
};

// TODO: dodać przycisk do kopiowania
// TODO: mona te dodać rodzaj produktu


// Command Handler
export const GenerateTransformMessageCommandHandlerSingletone = new GenerateTransferMessageCommandHandler<GenerateTransferMessageCommand, GenerateTransferMessageCommandResponse>();

// Command definition
module.exports = {
    data: new SlashCommandBuilder()
        .setName('generate-transfer-msg')
        .setDescription('Generates a transfer message for specific role (role has to begin with \'+\' sign)')
        .addRoleOption(option =>
            option.setName('role-to-buy')
                .setDescription('The role to buy.')
                .setRequired(true)),
    async execute(interaction: any) {

    }
};

