export class NotImplementedError extends Error {
    constructor() {
        super();
        this.message = "This functionality is not implemented yet!";
    }
}