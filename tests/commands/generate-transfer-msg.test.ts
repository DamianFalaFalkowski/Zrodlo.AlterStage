import { execute } from '../../src/commands/generate-transfer-msg';
import { MessageFlags } from 'discord.js';

describe('generate-transfer-message command', () => {
    let interaction: any;

    beforeEach(() => {
        interaction = {
            options: {
                data: [
                    {
                        role: {
                            name: '+ValidRole'
                        }
                    }
                ]
            },
            user: {
                globalName: 'TestUser',
                id: '123456789'
            },
            reply: jest.fn()
        };
    });

    test('should generate a valid transfer message', async () => {
        await execute(interaction);
        expect(interaction.reply).toHaveBeenCalledWith({
            content: expect.stringContaining('Aby dokonać zakupu produktu **+ValidRole**'),
            components: expect.any(Array),
            flags: MessageFlags.Ephemeral
        });
    });

    test('should reject invalid role name', async () => {
        interaction.options.data[0].role.name = 'InvalidRole@';
        await execute(interaction);
        expect(interaction.reply).toHaveBeenCalledWith({
            content: 'Nazwa roli zawiera niedozwolone znaki.',
            flags: MessageFlags.Ephemeral
        });
    });

    test('should reject message longer than 140 characters', async () => {
        interaction.user.globalName = 'a'.repeat(141);
        await execute(interaction);
        expect(interaction.reply).toHaveBeenCalledWith({
            content: 'Wiadomość jest zbyt długa. Maksymalna długość to 140 znaków.',
            flags: MessageFlags.Ephemeral
        });
    });
});

describe('GenerateTransferMessageCommand', () => {
    let interaction: any;

    beforeEach(() => {
        interaction = {
            options: {
                data: [
                    {
                        role: {
                            name: '+ValidRole'
                        }
                    }
                ]
            },
            user: {
                globalName: 'TestUser',
                id: '123456789'
            },
            reply: jest.fn()
        };
    });

    test('should generate a valid transfer message', async () => {
        await execute(interaction);
        expect(interaction.reply).toHaveBeenCalledWith({
            content: expect.stringContaining('Aby dokonać zakupu produktu **+ValidRole**'),
            components: expect.any(Array),
            flags: MessageFlags.Ephemeral
        });
    });

    test('should reject invalid role name', async () => {
        interaction.options.data[0].role.name = 'InvalidRole@';
        await execute(interaction);
        expect(interaction.reply).toHaveBeenCalledWith({
            content: 'Nazwa roli zawiera niedozwolone znaki.',
            flags: MessageFlags.Ephemeral
        });
    });

    test('should reject message longer than 140 characters', async () => {
        interaction.user.globalName = 'a'.repeat(141);
        await execute(interaction);
        expect(interaction.reply).toHaveBeenCalledWith({
            content: 'Wiadomość jest zbyt długa. Maksymalna długość to 140 znaków.',
            flags: MessageFlags.Ephemeral
        });
    });
});