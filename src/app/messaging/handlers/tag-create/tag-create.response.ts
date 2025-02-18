import { BaseCommandResponse } from '../../_base/base.response';
import { TagCreateCommand } from './tag-create.command';
import { InteractionReplyOptions, MessageFlags } from 'discord.js';

export class TagCreateResponse extends BaseCommandResponse {

    constructor(command :TagCreateCommand) {
        super(command); this._reply = { content: "", flags: MessageFlags.Ephemeral };
    }
    // sprawdzenie czy komponent został poprawnie zbudowany oraz czy jest kompletny
    protected override ensureReady(): boolean {
        // additional logic here
        return true;
    }

    // przygotowanie wiadomosci o błędzie
    public override PepeareFailureResponse() {
        // additional logic here
    }

    // przygotowanie wiadomości sukcesu
    public PrepeareSuccessResponseBase() {
        // additional logic here
    }
}