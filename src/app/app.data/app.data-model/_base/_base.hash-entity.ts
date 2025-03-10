import { Identifier, Model, ModelStatic, QueryTypes, Sequelize } from "sequelize";
import { BaseEntity } from './_base.entity';

function createAorB<A extends ModelStatic<BaseEntity>, B extends ModelStatic<BaseEntity>, T extends A | B>(aorb: T): A | B { return aorb; }; 

/** Abstrakcyjna klasa bazowa dla tabel haszujących */
export abstract class BaseHashEntity<A extends BaseEntity, B extends BaseEntity>
    extends Model 
{
    protected abstract schemaName: string;
    protected abstract modelName: string;

    protected abstract tableA: ModelStatic<A>;
    protected abstract tableB: ModelStatic<B>;

    protected abstract get tableA_PK_Name(): string;
    protected abstract get tableB_PK_Name(): string;

    public async GetRelated<E extends ModelStatic<A> | ModelStatic<B>>(
        table: E, 
        id: Identifier
    ): Promise<(A | B)[]>
    {
        let a = createAorB<ModelStatic<A>, ModelStatic<B>, E>(table);
        let foundIds: Identifier[];
        const tableName = `${this.schemaName}_${this.modelName}`;
        if(typeof(a) !== typeof(this.tableA))
        {
            foundIds = (await this.sequelize.query(
                `SELECT ${this.tableA_PK_Name} FROM ${tableName} WHERE ${this.tableB_PK_Name} = ${id}`, 
                { type: QueryTypes.SELECT }
            )) as Identifier[];
        }
        else {
            foundIds = (await this.sequelize.query(
                `SELECT ${this.tableB_PK_Name} FROM ${tableName} WHERE ${this.tableA_PK_Name} = ${id}`, 
                { type: QueryTypes.SELECT }
            )) as Identifier[];
        }
        return await a.findAll<A | B>(
            { where: { 'id': { 'in': foundIds}}}
        )!
    }
}