import { PostgresConnection } from '../connections/Postgres';
import { getDbConnection } from '../index';
import { UserRepository } from './UserRepository';

const connectionType = 'postgres'as const;
const connection: PostgresConnection = getDbConnection(connectionType).getRealConnection();

export default class DatabaseUserRepository implements UserRepository{
    constructor() {
    }
    findAll() {
        return connection.query("SELECT * FROM users");
    }
}