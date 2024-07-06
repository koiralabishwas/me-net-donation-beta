import {defineConfig} from 'drizzle-kit'

export default defineConfig({
  schema : './server/db/schema.ts',
  out : './server/db/output',
  dialect : "mysql",
  dbCredentials: {
    host: process.env.MYSQL_HOST!,
    user: process.env.MYSQL_USER!,
    database: process.env.MYSQL_DB!,
    password: process.env.MYSQL_PASSWORD!,
  },

})

