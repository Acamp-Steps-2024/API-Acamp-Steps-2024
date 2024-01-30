import { PostgresConnection } from '../databases/Postgres';
import { getDbConnection } from '../index';
import { UserRepository } from './UserRepository';

const connectionType = 'postgres'as const;
const connection: PostgresConnection = getDbConnection(connectionType).getRealConnection();

export default class DatabaseUserRepository implements UserRepository{
    constructor() {
    }
    async findAll(): Promise<any> {
        return await connection.query('SELECT * FROM users');
    }
}