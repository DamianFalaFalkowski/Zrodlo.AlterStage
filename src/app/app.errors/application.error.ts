import {_appError} from "./_app-error.base";

export class ApplicationError extends _appError
{
    readonly name: string = "ApplicationError";

    constructor(message: string) {
        super(message, false);
    }
}