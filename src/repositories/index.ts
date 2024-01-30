import { PostgresConnection } from "./connections/Postgres";
import { GoogleSheetsConnection } from "./connections/GoogleSheets";

export type ConnectionType = "postgres" | "google-sheets";

class DbConnection {
  private static instance: DbConnection;

  private constructor(private realConnection: any) {
    if (realConnection === "postgres") {
      this.realConnection = new PostgresConnection();
    } else if (realConnection === "google-sheets") {
      this.realConnection = new GoogleSheetsConnection();
    }
  }

  public getRealConnection(): any {
    return this.realConnection;
  }

  public static getInstance(connection: ConnectionType): DbConnection {
    if (!DbConnection.instance) {
      DbConnection.instance = new DbConnection(connection);
    }

    return DbConnection.instance;
  }
}

export function getDbConnection(connection: ConnectionType): DbConnection {
  return DbConnection.getInstance(connection);
}
