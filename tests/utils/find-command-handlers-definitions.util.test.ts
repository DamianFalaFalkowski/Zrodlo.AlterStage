import { FindCommandHandlersUtil } from '../../src/utils/find-command-handlers-definitions.util';
import { Client, Collection } from 'discord.js';

const sourcePath = '/Users/damianfalkowski/Documents/Source/Zrodlo.AlterStage/Zrodlo.AlterStage.DiscordAppTs/src';

// describe('FindCommandHandlersUtil', () => {
//     it('should return a collection of commands', () => {
//         const commands = FindCommandHandlersUtil.GetCommandDefinitions(new Client({ intents: [] }), sourcePath);
//         expect(commands).toBeInstanceOf(Collection);
//     });

//     it('should contain command data properties', () => {
//         const commands = FindCommandHandlersUtil.GetCommandDefinitions(new Client({ intents: [] }), sourcePath);
//         commands.forEach((command, key) => {
//             expect(command).toHaveProperty('name');
//             expect(command).toHaveProperty('description');
//         });
//     });
// });

//CORRECT: 'src/handlers/gen-transfer-msg/gen-transfer-msg.definition.ts'
//         'src/handlers/gen-transfer-msg/gen-transfer-msg.handler

//'src/handlers/gen-transfer-msg/gen-transfer-msg.definition.ts' from 'src/utils/find-command-handlers-definitions.util.ts'