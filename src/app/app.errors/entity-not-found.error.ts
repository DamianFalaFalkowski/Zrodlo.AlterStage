import { BaseEntity } from "../app.data/app.data-model/_base/_base-entity.model";
import { _appError } from "./_app-error.base";

export class EntityNotFoundByPkError<T extends BaseEntity> extends _appError
{
    readonly name: string = EntityNotFoundByPkError.name;

    constructor(
        foreignKeyName: string, 
        foreignKeyValueAsString: string,
        queriedEntityName: string)
    {
        super(`Requested foreignKey '${foreignKeyName}' with value '${foreignKeyValueAsString} has no corresponding '${queriedEntityName}' entity.'`, false);
    }
}