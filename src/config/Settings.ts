require("dotenv").config();

export class Settings {
  static readonly API_VERSION: string = "v1";

  static readonly DB_CONNECTION_TYPE: string = process.env
    .DB_CONNECTION_TYPE as string;
  static readonly SPREADSHEET_ID: string = process.env.SPREADSHEET_ID as string;
}