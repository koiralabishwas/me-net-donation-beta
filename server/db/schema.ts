import { table } from "console";
import { bigint, boolean, char, date, index, int, json, mysqlTable, text, time, timestamp, tinyint, varchar ,  } from "drizzle-orm/mysql-core";


export const donor = mysqlTable('donors', {
  donor_id : bigint("donor_id" , {mode : "bigint" , unsigned : true}).primaryKey().autoincrement().notNull(),
  donor_external_id : varchar("donor_external_id" , {length : 36}).notNull().unique(), //uuid v7
  name : varchar("name" , {length : 255}).notNull(),
  email : varchar("email" , {length : 255}).notNull().unique(),
  phone : varchar("phone", {length : 15}).notNull(),
  country_code : varchar("country_code" , {length : 2}).notNull(),
  postal_code : varchar("postal_code",{length : 10}).notNull(),
  address : varchar("address" , {length : 255}).notNull(),
  is_public : tinyint("is_public" , {unsigned : true}).notNull().default(0),
  display_name : varchar("display_name",{length :255}),
  corporate_no : varchar("corporate_no" , {length : 20}),
  message : text("message"),
  stripe_webhook_customer_object : json("stripe_webhook_customer_object"),
  created_at : timestamp("created_at",{mode : "date"} ).defaultNow().notNull(),
  updated_at : timestamp("updated_at" , {mode :"date"}).defaultNow().onUpdateNow().notNull()
} , (table) => {
  return {
    donor_external_id_idx : index("donor_external_id_idx").on(table.donor_external_id)
  }
})

export const transaction = mysqlTable("transaction" , {
  transaction_id : bigint("transaction_id" , {mode : "bigint" , unsigned : true}).primaryKey().notNull().autoincrement(),
  donation_id : varchar("donation_id" , {length : 15}).notNull().unique(), //寄付番号
  donor_id : bigint("donor_id" , {mode : "bigint" , unsigned : true}).notNull().references(() => donor.donor_id), 
  donor_external_id : varchar("donor_external_id" , {length : 36 }).notNull(), //uuid v7
  donation_project : varchar("donation_project" , {length : 50}).notNull(),
  amount : int("amount").notNull(),
  currency : varchar("currency" ,{length : 3}).notNull(),
  type : varchar("type" , {length : 10  , enum : ["ONE_TIME" , "MONTHLY" , "YEARLY"]}).notNull(),
  is_cancelled : tinyint("is_cancelled").default(0),
  tax_deduction_certificate_url : varchar("tax_deduction_certificate_url" , {length : 1023}).notNull(),
  stript_webhook_object : json("stript_webhook_object").notNull(),
  created_at : timestamp("created_at",{mode : "date"} ).defaultNow().notNull(),
  updated_at : timestamp("updated_at" , {mode :"date"}).defaultNow().notNull()
}, (table) => {
  return {
    donor_id_idx : index("donor_id_idx").on(table.donor_id),
    donation_id_idx : index("donation_id_idx").on(table.donation_id)
  }

})

export type Donor = typeof donor
export type transaction = typeof transaction

