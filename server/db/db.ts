import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";

async function createConnection() {
  const connection = await mysql.createConnection({
    host: process.env.MYSQL_HOST!,
    user: process.env.MYSQL_USER!,
    database: process.env.MYSQL_DB! ,
    port: 3306,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
  });

  return drizzle(connection);
}

export const db = createConnection();
