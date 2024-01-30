import { User } from '../../models/user/UserModel';
import { getDbConnection } from '../index';

import GoogleSheetsUserRepository from './GoogleSheetsUserRepository';
import DatabaseUserRepository from './DatabaseUserRepository';

// TODO: Move to .env file
const connectionType = 'google-sheets'as const;

export interface UserRepository {
    findAll(): User[];
}

export default connectionType === 'google-sheets' ? new GoogleSheetsUserRepository() : new DatabaseUserRepository() as UserRepository;