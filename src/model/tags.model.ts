import { Model } from 'sequelize';

/*
 * equivalent to: CREATE TABLE tags(
 * name VARCHAR(255) UNIQUE,
 * description TEXT,
 * username VARCHAR(255),
 * usage_count  INT NOT NULL DEFAULT 0
 * );
 */
export class TagsRepository extends Model {
    declare name: string;
    declare description: string;
    declare userId: string;
    declare createdUserId: string;
}