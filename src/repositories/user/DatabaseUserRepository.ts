import { PostgresConnection } from '@repositories/databases/Postgres';
import { getDbConnection } from '@repositories/index';
import { UserRepository } from './UserRepository';
import { User } from '@models/user/UserModel';

const connectionType = 'postgres'as const;
const connection: PostgresConnection = getDbConnection(connectionType).getRealConnection();

export default class DatabaseUserRepository implements UserRepository{
    constructor() {
    }
    updateOneAttribute(row: number, column: string, value: any): Promise<User> {
        throw new Error('Method not implemented.');
    }
    insertCheckinDate(id: number, date: Date): Promise<any> {
        throw new Error('Method not implemented.');
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