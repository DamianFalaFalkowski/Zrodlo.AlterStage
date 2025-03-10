import { Identifier, Model, ModelStatic, QueryTypes, Sequelize } from "sequelize";
import { BaseEntity } from './_base.entity';

declare function isTypeOfA<A extends BaseEntity, B extends BaseEntity, T extends A | T extends B ? A : B>(ins : T):  T extends A ?  true : never;

/** Abstrakcyjna klasa bazowa dla tabel haszujących */
export abstract class BaseHashEntity<A extends BaseEntity, B extends BaseEntity>
    extends Model 
{
    // protected abstract schemaName: string;
    // protected abstract modelName: string;

    // protected abstract tableA: ModelStatic<A>;
    // protected abstract tableB: ModelStatic<B>;

    // protected abstract get tableA_PK_Name(): string;
    // protected abstract get tableB_PK_Name(): string;
    
    
    
    protected abstract schemaName: string;
    protected abstract modelName: string;

    protected abstract tableA: ModelStatic<A>;
    protected abstract tableB: ModelStatic<B>;

    protected abstract get tableA_PK_Name(): string;
    protected abstract get tableB_PK_Name(): string;

    public static  async getRelated<T extends A | T extends B ? A : B>(
        instance : new () => T,
        foreginKey: Identifier
    ) 
        : Promise<(A[]|B[])>
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
            return await this.tableA.findAll<A>(searchOptions) as A[];
        else
            return await this.tableB.findAll<B>(searchOptions) as B[];
    }
}