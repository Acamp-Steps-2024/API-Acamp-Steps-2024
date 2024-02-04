import { getDbConnection } from "@repositories/index";
import { GoogleSheetsConnection } from "@repositories/databases/GoogleSheets";

import { SexInterface } from "@models/sex/SexInterface";
import { ChurchInterface } from "@models/church/ChurchInterface";
import { PaymentInterface } from "@models/payment/PaymentInterface";
import { TicketInterface } from "@models/ticket/TicketInterface";
import { User, UserResume } from "@models/user/UserModel";
import { UserRepository } from "./UserRepository";

import { convertDateToString, convertSimpleDateToString, convertStringToDate, removeSpecialCharacters } from "@utils/index";

const connectionType = 'google-sheets'as const;
const connection: GoogleSheetsConnection = getDbConnection(connectionType).getRealConnection();

export default class GoogleSheetsUserRepository implements UserRepository {
  spreadSheetName: string = "teste";

  async findAll(orderByName: boolean = true): Promise<UserResume[]> {
    const rows = await connection.getAllRowsOfSpreadSheet(this.spreadSheetName);
    
    const allUsers = rows.map((row) => {
      return (this.convertUserArrayToUserModel(row)) as UserResume;
    });

    return orderByName ? this.orderUsersByName(allUsers) : allUsers;
  }

  async findById(id: number): Promise<User | null> {
    const rows = await connection.getAllRowsOfSpreadSheet(this.spreadSheetName);

    const user = rows.find((row) => {
      return Number(row[0]) === id;
    });

    return user ? this.convertUserArrayToUserModel(user) : null;
  }

  async findByCpf(cpf: string): Promise<User | null> {
    const rows = await connection.getAllRowsOfSpreadSheet(this.spreadSheetName);

    const user = rows.find((row) => {
      return row[1] === cpf;
    });

    return user ? this.convertUserArrayToUserModel(user) : null;
  }

  async insertOne(user: User): Promise<User> {
    let userArray = this.convertUserModelToUserArray(user);

    await connection.insertRowInSpreadSheet(this.spreadSheetName, userArray);
    return await this.findByCpf(removeSpecialCharacters(user.cpf)) as User;
  }

  async updateOne(userId: number, user: User): Promise<User> {
    const rows = await this.findAll(false);
    const userRowIndex = rows.findIndex((user) => user.id === userId);
    const userArray = this.convertUserModelToUserArray(user);

    await connection.updateRowOfSpreadSheet(this.spreadSheetName, userRowIndex, userArray);
    return await this.findById(userId) as User;
  }

  async updateOneAttribute(userId: number, column: string, value: any): Promise<User> {
    const rows = await this.findAll(false);
    const userRowIndex = rows.findIndex((user) => user.id === userId);

    await connection.updateCellOfSpreadSheet(this.spreadSheetName, userRowIndex, column, value);

    return await this.findById(userId) as User;
  }

  private convertUserArrayToUserModel(data: String[]): User {
   return new User(
      Number(data[0]),
      String(data[1]),
      String(data[2]),
      String(data[3]),
      String(data[4]) as unknown as SexInterface,
      String(data[5]),
      String(data[6]),
      String(data[7]),
      String(data[8]),
      convertStringToDate(String(data[9])),
      String(data[10]),
      String(data[11]),
      String(data[12]),
      String(data[13]),
      String(data[14]),
      String(data[15]),
      String(data[16]),
      String(data[17]),
      String(data[18]),
      String(data[19]) as unknown as ChurchInterface,
      String(data[20]),
      String(data[21]),
      String(data[22]) as unknown as PaymentInterface,
      data[23] ? convertStringToDate(String(data[23])) : null,
      String(data[24]),
      data[25] ? convertStringToDate(String(data[25])) : null,
      data[26] ? convertStringToDate(String(data[26])) : null,
      String(data[27]) as unknown as TicketInterface,
      String(data[28]),
   );
  }

  private convertUserModelToUserArray(user: User): any[] {
    return [
      user.id,
      removeSpecialCharacters(user.cpf),
      user.name,
      user.surname,
      user.sex,
      removeSpecialCharacters(user.rg),
      user.email,
      removeSpecialCharacters(user.phone),
      user.companionName,
      convertSimpleDateToString(new Date(user.birthDate)),
      user.responsiblePersonName,
      removeSpecialCharacters(user.responsiblePersonDocument),
      removeSpecialCharacters(user.responsiblePersonPhone),
      removeSpecialCharacters(user.cep),
      user.street,
      user.houseNumber,
      user.neighborhood,
      user.city,
      user.state,
      user.church,
      user.allergies,
      user.medicines,
      user.payment,
      user.paymentDate ? convertDateToString(new Date(user.paymentDate)) : null,
      user.paymentCode,
      user.checkinDate ? convertDateToString(new Date(user.checkinDate)) : null,
      user.checkoutDate ? convertDateToString(new Date(user.checkoutDate)) : null,
      user.ticket,
      user.daily,
    ];
  }

  private orderUsersByName(users: UserResume[]): UserResume[] {
    return users.sort((a, b) => {
      return a.name.localeCompare(b.name);
    });
  }
}
