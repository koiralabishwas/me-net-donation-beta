
import 'dotenv/config'
import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import * as schema from "./schema"

// export async function connection() {
//    const connection = await mysql.createConnection({
//     host: process.env.MYSQL_HOST!,
//     user: process.env.MYSQL_USER!,
//     database: process.env.MYSQL_DB! ,
//     port: 3306,
//     waitForConnections: true,
//     connectionLimit: 10,
//     queueLimit: 0,
//   });

//   return drizzle(connection ,{schema ,mode :"default"});
// }

// export const db = connection();

export const connection = await mysql.createConnection({

    host: "localhost",
    user: "root",
    database: "drizzledb" ,
    password:"12345",
    port: 3306,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    multipleStatements : true
  });


export const db = drizzle(connection , {schema , mode : "default"})
