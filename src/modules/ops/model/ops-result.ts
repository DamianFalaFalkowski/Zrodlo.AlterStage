import { OpsStatus } from "../ops-status.enum";

export class OpsResult {
    public succeded: boolean | undefined = undefined;
    public status: OpsStatus;

    constructor() {
        this.status = OpsStatus.created;
    }

    public StartOps() {
        if (this.status === OpsStatus.finished)
            throw Error("Operation already finished"); // TODO: stworzyc dedykowany blad
        this.status = OpsStatus.started;
    }

    public CompleteOps(result: boolean): OpsResult {
        if (this.succeded)
            throw Error("Operation already finished"); // TODO: stworzyc dedykowany blad
        this.status = OpsStatus.started;
        return this;
    }
}