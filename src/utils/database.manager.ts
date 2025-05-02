import mysql from 'mysql2/promise';
import { Connection } from 'mysql2/promise';

class DatabaseManager {
  instanceUuid: string;
  constructor() {
    this.instanceUuid = crypto.randomUUID()
    this.start();

    const shutdown = async () => {
      console.log('Closing database connection...');
      await this.end(this.currentConnection!);
      console.log('✔️  Database connection closed');
      process.exit(0);
    }

    process.on('SIGINT', shutdown);
    process.on('SIGTERM', shutdown);
  }

  private currentConnection: Connection | null = null;

  private async start(maxTry: number = 5) {
    const tryNo = 0;

    while (this.currentConnection === null && tryNo < maxTry) {
      console.log(`[${this.instanceUuid}] Attempting to connect to the database... (${tryNo + 1}/${maxTry})`);
      try {
        this.currentConnection = await mysql.createConnection({
          host: process.env.DB_HOST,
          user: process.env.DB_USER,
          password: process.env.DB_PASSWORD,
          database: process.env.DB_NAME,
          port: Number(process.env.DB_PORT),
        })
        console.log('✔️  Database connection established');
      } catch (error) {
        console.error('❌  Database connection failed, trying again in 2 seconds...', error);
        await new Promise((resolve) => setTimeout(resolve, 2000));
      }
    }
  }

  async query(query: string, values?: any) {
    while (!this.currentConnection) {
      await this.start();
    }

    try {
      console.log(`[${this.instanceUuid}] Executing query:\n${query}\nWith values:\n${JSON.stringify(values)}`);
      const [rows] = await this.currentConnection.query(query, values);
      return rows;
    } catch (error) {
      console.error('❌  Database query failed', error);
      throw error;
    }
  }

  private async end(connection: Connection) {
    if (connection) {
      await connection.end();
    }
  }
}

export const databaseManager = new DatabaseManager();