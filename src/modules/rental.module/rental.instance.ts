import { AppModule } from "../../app/app.modules/app.module";

export interface IRental
{ 
}

export interface IRentalInstance
{
    _djEquipmentRentalChannelId: string;
}

export abstract class RentalInstance
    extends AppModule
    implements IRentalInstance, IRental
{
    protected constructor(offerTemplateBid: number) {
        super();
        this._offerTemplateBid = offerTemplateBid;
    }
    protected _offerTemplateBid: number;
    public _djEquipmentRentalChannelId: string = '1334687740951789638';// TODO: przeniesc do konfiguracji
}