import { Settings } from '@config/Settings';
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
}
