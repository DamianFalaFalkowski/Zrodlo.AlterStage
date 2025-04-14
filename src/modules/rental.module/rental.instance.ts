import { AppModule } from "../../app/app.modules/app.module";

export interface IRental
{ 
    areCommandsSetUp(): boolean;
}

export interface IRentalInstance
{
    DjEquipmentRentalChannelId: string;
    getCommandHandlersFolderPaths(): [string];
}

export abstract class RentalInstance
    extends AppModule
    implements IRentalInstance, IRental
{
    protected _areCommandsSetUp = false;
    areCommandsSetUp(): boolean {
        return this._areCommandsSetUp;
    }

    protected constructor(offerTemplateBid: number, djEquipmentRentalChannelId: string) {
        super();
        this._offerTemplateBid = offerTemplateBid;
        this.DjEquipmentRentalChannelId = djEquipmentRentalChannelId;
    }
    protected _offerTemplateBid: number;
    public readonly DjEquipmentRentalChannelId: string;
    private readonly _commandHandlersFolderPaths: [string] = [__dirname + "/commands"];
    public getCommandHandlersFolderPaths(): [string] { return this._commandHandlersFolderPaths; }
}