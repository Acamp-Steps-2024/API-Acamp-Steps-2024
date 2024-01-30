import { User } from '../../models/user/UserModel';

import GoogleSheetsUserRepository from './GoogleSheetsUserRepository';
import DatabaseUserRepository from './DatabaseUserRepository';

const connectionType = process.env.DB_CONNECTION_TYPE;

export interface UserRepository {
    findAll(): Promise<User[]>;
}

export default connectionType === 'google-sheets' ? new GoogleSheetsUserRepository() : new DatabaseUserRepository() as UserRepository;