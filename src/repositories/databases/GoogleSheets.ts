import { HTTPError } from "@models/errorHandling";

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
    try {
      const auth = new google.auth.GoogleAuth({
        keyFile: "./sheetsDbCredentials.env",
        scopes: ["https://www.googleapis.com/auth/spreadsheets"],
      });

      const client = await auth.getClient();

      const googleSheets = google.sheets({
        version: "v4",
        auth: client,
      });

      const spreadsheetId = "1VcvNguUvQJrh8nstwFvdyeT4xBIIm4v9_EhmknLkqwQ";

      return {
        auth,
        client,
        googleSheets,
        spreadsheetId,
      };
    } catch (error) {
      throw new HTTPError(500, "Unable to establish communication with Google Sheets.", error);
    }
  }

  async getAllRowsOfSpreadSheet(spreadsheetName: string, range?: string) {
    !range ? (range = 'B1:AA1000') : (range = range);

    try {
      const { googleSheets, auth, spreadsheetId } = await this.getAuthSheets();

      const response = await googleSheets.spreadsheets.values.get({
        auth,
        spreadsheetId,
        range: `${spreadsheetName}!${range}`,
      });

      const rows = response.data.values;
      return rows;

    } catch (error) {
      throw new HTTPError(500, `Unable to get all rows of spreadsheet: ${spreadsheetName}.`, error);
    }
  }
}
