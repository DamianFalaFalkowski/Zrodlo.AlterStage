import { Model } from "sequelize";

export abstract class BaseEntity extends Model 
{
    declare id: number;
    declare createdAt: Date;
    declare updatedAt: Date;
}