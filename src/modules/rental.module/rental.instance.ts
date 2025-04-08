import { AppModule } from "../../app/app.modules/app.module";

export interface IRental
{ 
}

export interface IRentalInstance
{
    DjEquipmentRentalChannelId: string;
}

export abstract class RentalInstance
    extends AppModule
    implements IRentalInstance, IRental
{
    protected constructor(offerTemplateBid: number, djEquipmentRentalChannelId: string) {
        super();
        this._offerTemplateBid = offerTemplateBid;
        this.DjEquipmentRentalChannelId = djEquipmentRentalChannelId;
    }
    protected _offerTemplateBid: number;
    public readonly DjEquipmentRentalChannelId: string;
}