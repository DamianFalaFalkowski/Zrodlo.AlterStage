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
        let isA = false; 
        if (instance instanceof this.tableA)
            isA = true; //isTypeOfA(new instance()) === true;

        const hashTableName = this.schemaName + '_' + this.modelName;

        const query = `SELECT ${isA ? this.tableA_PK_Name : this.tableB_PK_Name} as 'id' FROM ${hashTableName} WHERE ${isA ? this.tableB_PK_Name : this.tableA_PK_Name } = ${foreginKey}`;
        const foundIds = (await this.sequelize.query(
            query, 
            { type: QueryTypes.SELECT }
        )) as Identifier[];
        let intFoundIds: Identifier[] = [];
        foundIds.forEach(x => intFoundIds.push((x as unknown as BaseEntity).id));

        //onst searchOptions = { where: { id: { in: intFoundIds}}};
        let results: T[] = [];
        for (let index = 0; index < intFoundIds.length; index++) {
            const element = intFoundIds[index];
            const q = `SELECT * FROM ${isA ? this.tableA.name : this.tableB.name} WHERE id = ${element}`;
            const r = (await this.sequelize.query(q))[0] as unknown as T;
            results.push(r);
        }
        return results;
    }
    
    protected abstract schemaName: string;
    protected abstract modelName: string;

    protected abstract tableA: ModelStatic<A>;
    protected abstract tableB: ModelStatic<B>;

    protected abstract get tableA_PK_Name(): string;
    protected abstract get tableB_PK_Name(): string;

}