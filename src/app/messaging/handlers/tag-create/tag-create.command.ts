import { ChatInputCommandInteraction } from 'discord.js';
import { BaseCommand } from '../../_base/commands/base.command';
import { TagCreateResponse } from './tag-create.response';

export class TagCreateCommand extends BaseCommand<TagCreateResponse> {
    /**
     *
     */
    constructor(interaction : ChatInputCommandInteraction) {
        super(interaction);
        
    }
    /** Metoda potrzebna wyłącznie do zapewnienia klasie basower obiektu response */
    public override CreateResponseObject(): TagCreateResponse {
        return new TagCreateResponse(this);
    }

    public override CheckAuthorisationAndValidity(): boolean {
        // additional logic here
        return true;
    }
}
