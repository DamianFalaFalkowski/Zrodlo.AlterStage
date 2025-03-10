import { BaseEntity } from "../app.data/app.data-model/_base/_base.entity";
import { _appError } from "./_app-error.base";

/** ForeignKey '${foreignKeyName}' with value '${foreignKeyValueAsString}' has no '${typeof(repository).name}' entity with equal primary key */
export class EntityNotFoundByFkError<T extends BaseEntity> extends _appError
{
    readonly name: string = EntityNotFoundByFkError.name;

    constructor(
        repository: new () => T,
        foreignKeyName: string, 
        foreignKeyValueAsString: string)
    {
        super(`Requested foreignKey '${foreignKeyName}' with value '${foreignKeyValueAsString}' has no '${typeof(repository).name}' entity with equal primary key`, false);
    }
}