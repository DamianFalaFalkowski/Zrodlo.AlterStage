// import { BaseCommandResponse } from '../../_base/commands/base.response';
// import dcLogger from '../../../utils/dc-logger.util';


// export class ReloadCommandResponse extends BaseCommandResponse {

//     protected commandOpt: string;

//     constructor(isEphemeral: boolean = false, command: string) {
//         super(isEphemeral);
//         this.commandOpt = command;
//     }

//     // sprawdzenie czy komponent został poprawnie zbudowany oraz czy jest kompletny
//     protected ensureReady(): boolean {
//         throw Error("Not implemented.")
//     }

//     public PepeareFailureResponse(errorMessage: string) {
//         try {
//             // stuff can be done here
//             super.PepeareFailureResponse(errorMessage);
//         } catch (error) {
//             dcLogger.logError(error as Error);
//             throw error;
//         }
//     }

//     public PrepeareSuccessResponse() {
//         this._reply.content = ``;
//     }
// }