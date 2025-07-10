import { Client, GatewayIntentBits, AttachmentBuilder, Interaction, InteractionReplyOptions } from 'discord.js';
import { Readable } from 'stream';

function createReplyWithAttachment(stream: Readable): InteractionReplyOptions
{
    const attachment = new AttachmentBuilder(stream, { name: 'image.jpg', description: 'Przykładowy obrazek' });
    return {
        content: 'Oto Twój obrazek:',
        files: [attachment]
    };
}
