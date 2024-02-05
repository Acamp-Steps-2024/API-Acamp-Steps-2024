import { PostgresConnection } from '@repositories/databases/Postgres';
import { getDbConnection } from '@repositories/index';
import { UserRepository } from './UserRepository';
import { User } from '@models/user/UserModel';

const connectionType = 'postgres'as const;
const connection: PostgresConnection = getDbConnection(connectionType).getRealConnection();

export default class DatabaseUserRepository implements UserRepository{
    constructor() {
    }
    checkAvailableEmail(email: string): Promise<boolean> {
        throw new Error('Method not implemented.');
    }
    checkAvailableCpf(cpf: string): Promise<boolean> {
        throw new Error('Method not implemented.');
    }
    updateOne(userId: string, user: User): Promise<User> {
        throw new Error('Method not implemented.');
    }
    updateOneAttribute(userId: string, column: string, value: any): Promise<User> {
        throw new Error('Method not implemented.');
    }
    insertOne(user: User): Promise<User> {
        throw new Error('Method not implemented.');
    }
    insertCheckinDate(id: number, date: Date): Promise<any> {
        throw new Error('Method not implemented.');
    }
    async findAll(): Promise<any> {
        return await connection.query('SELECT * FROM users');
    }

    async findById(id: string): Promise<any> {
        return await connection.query('SELECT * FROM users');
    }

    async findByCpf(cpf: string): Promise<any> {
        return await connection.query('SELECT * FROM users');
    }
}