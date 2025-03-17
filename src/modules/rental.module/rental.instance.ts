import { AppModule } from "../../app/app.modules/app.module";

export interface IRental
{ 
}

export interface IRentalInstance
{

}

export abstract class RentalInstance
    extends AppModule
    implements IRentalInstance, IRental
{

}