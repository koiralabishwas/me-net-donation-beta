import { config } from 'process'
import {defineConfig} from 'drizzle-kit'
import { env } from 'process'

export default defineConfig({
  schema : './server/db/schema.ts',
  out : './server/db/output',
  dialect : "mysql",
  dbCredentials: {
    // while in dynamic
    host: process.env.MYSQL_HOST as string,
    user: process.env.MYSQL_USER as string,
    database: process.env.MYSQL_DATABASE as string,
    password: process.env.MYSQL_PASSWORD as string,
    port : Number(process.env.MYSQL_PORT),

// ハードコードするときは動きます。
    // host:"localhost",
    // user: "root",
    // database: "drizzledb",
    // password:"12345" ,
    // port : 3306,
  },

})

