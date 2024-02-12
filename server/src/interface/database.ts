import { Client, QueryConfig } from "pg";

export class Database {
  static client = new Client({
    host: process.env.host ?? "localhost",
    user: process.env.user ?? "postgres",
    port: Number(process.env.port) ?? 5432,
    database: process.env.database ?? "postgres",
    password: process.env.password ?? "example",
  });

  client = Database.client;

  constructor() {
    this.client.connect();
  }

  /**
   * Connect to db
   */
  static async connect() {
    try {
      await Database.client.connect();

      Database.client.on("error", (err) => {
        console.error("Database Error", err.stack);
      });

      const res = await Database.query("SELECT NOW();");

      console.log("Connected to database", res);
    } catch (error) {
      console.log("Failed to connect to database");
      console.error(error);
    }
  }

  /**
   * Preform a db query
   *
   * @param query Query options or SQL string
   * @param values values to be used in the query
   * @returns rows from the query
   */
  static async query(query: string | QueryConfig, values?: any[]) {
    try {
      const res = await Database.client.query(query, values);

      return res.rows;
    } catch (error) {
      console.error("Error executing query", error);
      return [];
    }
  }

  static disconnect() {
    Database.client.end();
  }
}
