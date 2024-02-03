import { getDbConnection } from "@repositories/index";
import { GoogleSheetsConnection } from "@repositories/databases/GoogleSheets";

import { SexInterface } from "@models/sex/SexInterface";
import { ChurchInterface } from "@models/church/ChurchInterface";
import { TicketInterface } from "@models/ticket/TicketInterface";
import { User, UserResume } from "@models/user/UserModel";
import { UserRepository } from "./UserRepository";

import { convertStringToDate } from "@utils/index";

const connectionType = 'google-sheets'as const;
const connection: GoogleSheetsConnection = getDbConnection(connectionType).getRealConnection();

export default class GoogleSheetsUserRepository implements UserRepository {
  spreadSheetName: string = "Inscrições 2024";

  async findAll(): Promise<UserResume[]> {
    const rows = await connection.getAllRowsOfSpreadSheet(this.spreadSheetName);
    
    return rows.map((row) => {
      return (this.convertUserArrayToUserModel(row)) as UserResume;
    });
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
      String(data[22]),
      data[23] ? convertStringToDate(String(data[23])) : null,
      String(data[24]),
      data[25] ? convertStringToDate(String(data[25])) : null,
      data[26] ? convertStringToDate(String(data[26])) : null,
      String(data[27]) as unknown as TicketInterface,
      String(data[28]),
   );
  }
}
