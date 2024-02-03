import { Settings } from '@config/Settings';

import { User, UserResume } from '@models/user/UserModel';

import GoogleSheetsUserRepository from './GoogleSheetsUserRepository';
import DatabaseUserRepository from './DatabaseUserRepository';

const connectionType = Settings.DB_CONNECTION_TYPE;

export interface UserRepository {
    findAll(): Promise<UserResume[]>;
    findById(id: number): Promise<User | null>;
    findByCpf(cpf: string): Promise<User | null>;
}

export default connectionType === 'google-sheets' ? new GoogleSheetsUserRepository() : new DatabaseUserRepository() as UserRepository;