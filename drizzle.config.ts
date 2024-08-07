import {defineConfig} from 'drizzle-kit'

export default defineConfig({
  schema : './server/db/schema.ts',
  out : './server/db/output',
  dialect : "mysql",
  dbCredentials: {
    host: process.env.HOST!,
    user: process.env.USER!,
    database: process.env.DATABASE!,
    password: process.env.PASSWORD!,
    port : Number(process.env.PORT)!,

    // host:"localhost",
    // user: "root",
    // database: "drizzledb",
    // password:"12345" ,
    // port : 3306,
  },

})

