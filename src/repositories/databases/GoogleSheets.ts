import { Settings } from '@config/Settings';
import { User } from '@models/user/UserModel';
const { google } = require("googleapis");

interface GoogleSheetsAuth {
  auth: any;
  client: any;
  googleSheets: any;
  spreadsheetId: string;
}

export class GoogleSheetsConnection {
  constructor() {}

  private async getAuthSheets(): Promise<GoogleSheetsAuth> {
    const auth = new google.auth.GoogleAuth({
      keyFile: "./sheetsDbCredentials.env",
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    const client = await auth.getClient();

    const googleSheets = google.sheets({
      version: "v4",
      auth: client,
    });

    const spreadsheetId = Settings.SPREADSHEET_ID;

    return {
      auth,
      client,
      googleSheets,
      spreadsheetId,
    };
  }

  async getAllRowsOfSpreadSheet(
    spreadsheetName: string,
    range?: string
  ): Promise<String[][]> {
    !range ? (range = "A2:AC1000") : (range = range);

    const { googleSheets, auth, spreadsheetId } = await this.getAuthSheets();

    const response = await googleSheets.spreadsheets.values.get({
      auth,
      spreadsheetId,
      range: `${spreadsheetName}!${range}`,
    });

    const rows = response.data.values;
    return rows;
  }

  async insertRowInSpreadSheet(
    spreadsheetName: string,
    data: any[]
  ): Promise<void> {
    const { googleSheets, auth, spreadsheetId } = await this.getAuthSheets();

    await googleSheets.spreadsheets.values.append({
      auth,
      spreadsheetId,
      range: `${spreadsheetName}!A1`,
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [data],
      },
    });
  }

  async updateManyCellsOfSpreadSheet(
    spreadsheetName: string,
    column: string,
    allUsers: User[],
    allGeneratedIds: string[]
  ): Promise<void> {
    const { googleSheets, auth, spreadsheetId } = await this.getAuthSheets();

    await googleSheets.spreadsheets.values.update({
      auth,
      spreadsheetId,
      range: `${spreadsheetName}!${column}${2}:${column}${allGeneratedIds.length + 2}`,
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: allUsers.map((user, index) => {
          if (user.id === "") {
            return [allGeneratedIds[index]];
          }
          return [user.id];
        }),
      },
    });
  }

  async updateRowOfSpreadSheet(
    spreadsheetName: string,
    rowIndex: number,
    data: any[]
  ): Promise<void> {
    const { googleSheets, auth, spreadsheetId } = await this.getAuthSheets();

    await googleSheets.spreadsheets.values.update({
      auth,
      spreadsheetId,
      range: `${spreadsheetName}!A${rowIndex + 2}`,
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [data],
      },
    });
  }

  async updateCellOfSpreadSheet(
    spreadsheetName: string,
    rowIndex: number,
    column: string,
    data: any
  ): Promise<void> {
    const { googleSheets, auth, spreadsheetId } = await this.getAuthSheets();

    await googleSheets.spreadsheets.values.update({
      auth,
      spreadsheetId,
      range: `${spreadsheetName}!${column}${rowIndex + 2}`,
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [[data]],
      },
    });
  }
}
