import { ChatInputCommandInteraction } from 'discord.js';
import { TagCreateResponse } from './tag-create.response';
import { BaseCommand } from '../_command-handling-base/base.command';


// TODO: upewnic sie ze wszystko jest ok
// TODO: dodac komentarze
// TODO: dodac logowanie
export class TagCreateCommand extends BaseCommand<TagCreateResponse> {
    /**
     *
     */
    constructor(interaction : ChatInputCommandInteraction, response: TagCreateResponse) {
        super(interaction, response);       
    }

    public override CheckAuthorisationAndValidity(): boolean {
        // additional logic here
        return true;
    }
}
