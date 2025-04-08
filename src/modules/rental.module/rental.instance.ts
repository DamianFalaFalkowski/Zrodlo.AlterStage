import { ApplicationError } from "../../app/app.errors/application.error";
import { AppModule } from "../../app/app.modules/app.module";

export interface IRental
{ 
    isOfferTemplateLoaded(): boolean;
}

export interface IRentalInstance
{
    getOfferTemplateModel(): TemplateModel;
    djEquipmentRentalChannelId: string;
}

export abstract class RentalInstance
    extends AppModule
    implements IRentalInstance, IRental
{
    protected constructor(offerTemplateName: string) {
        super();
        this._offerTemplateName = offerTemplateName;
    }
    protected _offerTemplateName: string;
    protected _isOfferTemplateLoaded = false;
    protected _offerTemplateModel?: TemplateModel;
    isOfferTemplateLoaded(): boolean
    {
        return this._isOfferTemplateLoaded;
    }
    getOfferTemplateModel(): TemplateModel
    {
        if (!this.isOfferTemplateLoaded())
            throw new ApplicationError('Szablon oferty nie zostal zaladowany');
        return this._offerTemplateModel!;
    }
    public djEquipmentRentalChannelId: string = '1334687740951789638';// TODO: przeniesc do konfiguracji
}