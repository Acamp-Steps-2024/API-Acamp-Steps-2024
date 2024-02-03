import { PostgresConnection } from '@repositories/databases/Postgres';
import { getDbConnection } from '@repositories/index';
import { UserRepository } from './UserRepository';

const connectionType = 'postgres'as const;
const connection: PostgresConnection = getDbConnection(connectionType).getRealConnection();

export default class DatabaseUserRepository implements UserRepository{
    constructor() {
    }
    async findAll(): Promise<any> {
        return await connection.query('SELECT * FROM users');
    }

    async findById(id: number): Promise<any> {
        return await connection.query('SELECT * FROM users');
    }

    async findByCpf(cpf: string): Promise<any> {
        return await connection.query('SELECT * FROM users');
    }
}