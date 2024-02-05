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

  async findById(id: string): Promise<User | null> {
    const rows = await connection.getAllRowsOfSpreadSheet(this.spreadSheetName);

    const user = rows.find((row) => {
      return row[0] === id;
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
    return user;
  }

  async updateOne(userId: string, user: User): Promise<User> {
    const rows = await this.findAll(false);
    const userRowIndex = rows.findIndex((user) => user.id === userId);
    const userArray = this.convertUserModelToUserArray(user);

    await connection.updateRowOfSpreadSheet(this.spreadSheetName, userRowIndex, userArray);
    return user;
  }

  async updateOneAttribute(userId: string, column: string, value: any): Promise<User> {
    const rows = await this.findAll(false);
    const userRowIndex = rows.findIndex((user) => user.id === userId);

    await connection.updateCellOfSpreadSheet(this.spreadSheetName, userRowIndex, column, value);

    return await this.findById(userId) as User;
  }

  async checkAvailableCpf(cpf: string): Promise<boolean> {
    const rows = await this.findAll();
    return !rows.some((user) => removeSpecialCharacters(user.cpf) === removeSpecialCharacters(cpf));
  }

  async checkAvailableEmail(email: string): Promise<boolean> {
    const rows = await this.findAll();
    return !rows.some((user) => user.email === email);
  }

  private convertUserArrayToUserModel(data: String[]): User {
   return new User({
      id: String(data[0]),
      cpf: String(data[1]),
      name: String(data[2]),
      surname: String(data[3]),
      sex: String(data[4]) as unknown as SexInterface,
      rg: String(data[5]),
      email: String(data[6]),
      phone: String(data[7]),
      companionName: String(data[8]),
      birthDate: convertStringToDate(String(data[9])),
      responsiblePersonName: String(data[10]),
      responsiblePersonDocument: String(data[11]),
      responsiblePersonPhone: String(data[12]),
      cep: String(data[13]),
      street: String(data[14]),
      houseNumber: Number(data[15]),
      neighborhood: String(data[16]),
      city: String(data[17]),
      state: String(data[18]),
      church: String(data[19]) as unknown as ChurchInterface,
      allergies: String(data[20]),
      medicines: String(data[21]),
      payment: String(data[22]) as unknown as PaymentInterface,
      paymentDate: data[23] ? convertStringToDate(String(data[23])) : null,
      paymentCode: String(data[24]),
      checkinDate: data[25] ? convertStringToDate(String(data[25])) : null,
      checkoutDate: data[26] ? convertStringToDate(String(data[26])) : null,
      ticket: String(data[27]) as unknown as TicketInterface,
      daily: String(data[28]),
   });
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
      user.companionName ? user.companionName : "",
      convertSimpleDateToString(new Date(user.birthDate)),
      user.responsiblePersonName ? user.responsiblePersonName : "",
      user.responsiblePersonDocument ? removeSpecialCharacters(user.responsiblePersonDocument) : "",
      user.responsiblePersonPhone ? removeSpecialCharacters(user.responsiblePersonPhone) : "",
      removeSpecialCharacters(user.cep),
      user.street,
      user.houseNumber,
      user.neighborhood,
      user.city,
      user.state,
      user.church,
      user.allergies,
      user.medicines,
      user.payment ? user.payment : "",
      user.paymentDate ? convertDateToString(new Date(user.paymentDate)) : "",
      user.paymentCode ? user.paymentCode : "",
      user.checkinDate ? convertDateToString(new Date(user.checkinDate)) : "",
      user.checkoutDate ? convertDateToString(new Date(user.checkoutDate)) : "",
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
