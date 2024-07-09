import { bigint, boolean, char, int, mysqlTable, timestamp, varchar } from "drizzle-orm/mysql-core";

// bigint id PK au to incrimaent
// string checkout_session_id "Stripe Checkout Session ID"
// string name "名前"
// string email "メールアドレス"
// string phone "電話番号"
// string country "国 JP,US など"
// string postal_code "郵便番号"
// string address "都道府県付き住所"
// int amount "寄付額"
// string selected_project "寄付した事業"
// boolean is_public "公開で良いかどうか"
// string display_name "公開するときの名前"
// timestamp created_at
// timestamp updated_at

export const donors = mysqlTable('donors', {
  id : bigint('id' , {mode : "bigint"}).primaryKey().autoincrement(),
  checkout_session_id : varchar('checkout_session_id', {length : 500}),
  name : varchar('name' , {length : 256}),
  is_corporate : boolean('is_corporate').default(false),
  corporate_number:varchar('corporate_number',{length : 20}),
  email : varchar('email' , {length : 256}),
  phone : varchar("phone" , {length : 11}),
  country : varchar("country" , {length : 256}), //TODO: enums にしたほうがいい？
  postal_code : varchar("postal_code" , {length : 256}),
  address : varchar("address" , {length : 500}),
  amount : int("amount" , {unsigned : true}),
  selected_project : varchar("selected_project" , {length : 100}),
  is_public : boolean("is_public" ).default(false),
  display_name : varchar("display_name",{length : 300}),
  message : varchar('message',{length : 1000}),
  created_at : timestamp("created_at" , {mode : "date" }).notNull().defaultNow(),
  updated_at : timestamp("updated_at" , {mode : "date" }).notNull().defaultNow(),

})

export type Donors = typeof donors

