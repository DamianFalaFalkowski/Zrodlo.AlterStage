import { Identifier, Model, ModelStatic, QueryTypes, Sequelize } from "sequelize";
import { BaseEntity } from './_base.entity';

declare function isTypeOfA<A extends BaseEntity, B extends BaseEntity, T extends A | T extends B ? A : B>(ins : T):  T extends A ?  true : never;

/** Abstrakcyjna klasa bazowa dla tabel haszujących */
export abstract class BaseHashEntity<A extends BaseEntity, B extends BaseEntity>
    extends BaseEntity 
{
    public async getRelated<T extends A | B>(
        instance : new () => T,
        foreginKey: Identifier
    ) 
        : Promise<(T[])>
    {
        const isA = isTypeOfA(new instance()) === true;
        const hashTableName = this.schemaName + '_' + this.modelName;

        const foundIds = (await this.sequelize.query(
            `SELECT ${isA ? this.tableA_PK_Name : this.tableB_PK_Name} 
            FROM ${hashTableName} 
            WHERE ${isA ? this.tableB_PK_Name : this.tableA_PK_Name } = ${foreginKey}`, 
            { type: QueryTypes.SELECT }
        )) as Identifier[];
        
        const searchOptions = { where: { 'id': { 'in': foundIds}}};
        if (isA)
            return await this.tableA.findAll<A>(searchOptions) as T[];
        else
            return await this.tableB.findAll<B>(searchOptions) as T[];
    }
    
    protected abstract schemaName: string;
    protected abstract modelName: string;

    protected abstract tableA: ModelStatic<A>;
    protected abstract tableB: ModelStatic<B>;

    protected abstract get tableA_PK_Name(): string;
    protected abstract get tableB_PK_Name(): string;

}