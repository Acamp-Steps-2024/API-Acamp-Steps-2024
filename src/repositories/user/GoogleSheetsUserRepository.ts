import { getDbConnection } from "../index";
import { User } from "../../models/user/UserModel";
import { GoogleSheetsConnection } from "../databases/GoogleSheets";
import { UserRepository } from "./UserRepository";

const connectionType = 'google-sheets'as const;
const connection: GoogleSheetsConnection = getDbConnection(connectionType).getRealConnection();

export default class GoogleSheetsUserRepository implements UserRepository {
  spreadSheetName: string = "Página1";

  async findAll(): Promise<User[]> {
    const rows = await connection.getAllRowsOfSpreadSheet(this.spreadSheetName);
    console.log(rows);
    return [];
  }
}
