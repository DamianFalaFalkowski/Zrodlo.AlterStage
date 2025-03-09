import { BaseEntity } from "../app.data/app.data-model/_base/_base-entity.model";
import { _appError } from "./_app-error.base";

export class EntityNotFoundByPkError<T extends BaseEntity> extends _appError
{
    readonly name: string = EntityNotFoundByPkError.name;

    constructor(
        repository: new () => T,
        primaryKeyValueAsString: string)
    {
        super(`Used value '${primaryKeyValueAsString} has no corresponding '${typeof(repository).name}' entity with equal primary key.'`, false);
    }
}