import { Settings } from '@config/Settings';

import { User, UserResume } from '@models/user/UserModel';

import GoogleSheetsUserRepository from './GoogleSheetsUserRepository';
import DatabaseUserRepository from './DatabaseUserRepository';

const connectionType = Settings.DB_CONNECTION_TYPE;

export interface UserRepository {
    findAll(): Promise<UserResume[]>;
    findById(id: string): Promise<User | null>;
    findByCpf(cpf: string): Promise<User | null>;

    insertOne(user: User): Promise<User>;
    setAllIdsForUsers(columnId: string, allUsers: any[], allGeneratedIds: string[]): Promise<void>;

    updateOne(userId: string, user: User): Promise<User>;
    updateOneAttribute(userId: string, column: string, value: any): Promise<User>;

    checkAvailableCpf(cpf: string): Promise<boolean>;
    checkAvailableEmail(email: string): Promise<boolean>;
}

export default connectionType === 'google-sheets' ? new GoogleSheetsUserRepository() : new DatabaseUserRepository() as UserRepository;