import dcLoggerUtil from "../../utils/dc-logger.util";

export abstract class _appError extends Error
{
    abstract readonly name: string;

    message: string;
    stack?: string | undefined;
    cause?: unknown;

    private _isBusinessError?: boolean;

    constructor(message: string, isBusinessError: boolean = false) {
        super(message);
        this.message = message;
        this._isBusinessError = isBusinessError;
    }

    get isBusinessError() : (boolean) { return this._isBusinessError ? true : false; }
    Handle(): Error
    {
        dcLoggerUtil.logStringError(`${this.isBusinessError ? 'Błąd biznesowy': 'Błąd'}: ${this.message}`);
        // TODO: przekazywanie błędów do hosta w celu obsługi a wczesniej funkcjonalność umoliwiająca taki handling
        return this;
    }
}