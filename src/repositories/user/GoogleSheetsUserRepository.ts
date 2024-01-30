import { getDbConnection } from "../index";
import { User } from "../../models/user/UserModel";
import { GoogleSheetsConnection } from "../connections/GoogleSheets";
import { UserRepository } from "./UserRepository";

const connectionType = 'google-sheets'as const;
const connection: GoogleSheetsConnection = getDbConnection(connectionType).getRealConnection();

export default class GoogleSheetsUserRepository implements UserRepository {
  findAll(): User[] {
    return [{
      cpf: '123.456.789-00',
      name: 'John',
      surname: 'Doe',
      sex: 'Male',
      rg: '987654321',
      email: 'john.doe@example.com',
      phone: '123456789',
      birthDate: new Date('1990-01-01'),
      cep: '12345-678',
      street: 'Main Street',
      houseNumber: '123',
      neighborhood: 'Downtown',
      city: 'City',
      state: 'State',
    }];
  }
}
