import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";

async function createConnection() {
  const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "drizzledb",
    port: 3306,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
  });

  return drizzle(connection);
}

export const db = createConnection();
