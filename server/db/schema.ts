import { table, timeStamp } from "console";
import { create } from "domain";
import {
  bigint,
  boolean,
  char,
  date,
  index,
  int,
  json,
  mysqlTable,
  text,
  time,
  timestamp,
  tinyint,
  varchar,
} from "drizzle-orm/mysql-core";

export const donor = mysqlTable(
  "donor",
  {
    donor_id: bigint("donor_id", { mode: "bigint", unsigned: true })
      .notNull()
      .autoincrement()
      .primaryKey(),
    donor_external_id: varchar("donor_external_id", { length: 36 })
      .notNull()
      .unique(),
    stripe_customer_id: varchar("stripe_customer_id", {
      length: 100,
    }).notNull(),
    name: varchar("name", { length: 266 }).notNull(),
    email: varchar("email", { length: 255 }).notNull().unique(),
    phone: varchar("phone", { length: 15 }).notNull(),
    country_code: varchar("country_code", { length: 2 }).notNull(),
    postal_code: varchar("postal_code", { length: 10 }).notNull(),
    is_public: tinyint("is_public", { unsigned: true }).notNull(),
    display_name: varchar("display_name", { length: 255 }),
    corporate_number: varchar("corporate_number", { length: 20 }),
    message: text("message"),
    stripe_customer_object: json("stripe_customer_object"),
    created_at: timestamp("created_at", { mode: "date" }).defaultNow(),
    updated_at: timestamp("updated_at", { mode: "date" }).onUpdateNow(),
  },
  (table) => {
    return {
      donor_external_id_idx: index("donor_external_id_idx").on(
        table.donor_external_id
      ),
    };
  }
);

export const subscription = mysqlTable(
  "subscription",
  {
    subscription_id: bigint("subscription_id", {
      mode: "bigint",
      unsigned: true,
    })
      .primaryKey()
      .autoincrement(),
    subscription_external_id: varchar("subscription", { length: 36 })
      .notNull()
      .unique(), //uuid,
    stripe_subscription_id: varchar("stripe_subscription", { length: 100 })
      .notNull()
      .unique(),
    donor_id: bigint("donor_id", { mode: "bigint", unsigned: true }).notNull(),
    donor_external_id: varchar("donor_external_id", { length: 36 }).notNull(), //uuid,
    donation_project: varchar("donation_project", { length: 50 }).notNull(),
    amount: int("amount", { unsigned: true }).notNull(),
    currency: varchar("currency", { length: 3 }).notNull(),
    is_cancelled: tinyint("is_cancelled", { unsigned: true })
      .notNull()
      .default(0),
    stripe_subscription_object: json("stripe_subscription_object"),
    created_at: timestamp("created_at", { mode: "date" }).defaultNow(),
    updated_at: timestamp("updated_at", { mode: "date" }).onUpdateNow(),
  },
  (table) => {
    return {
      donor_external_id_idx: index("donor_external_id_idx").on(
        table.donor_external_id
      ),
    };
  }
);

export const transaction = mysqlTable(
  "transaction",
  {
    transaction_id: bigint("transaction_id", { mode: "bigint", unsigned: true })
      .notNull()
      .autoincrement()
      .primaryKey(),
    donation_id: varchar("donation_id", { length: 15 }).notNull(),
    donor_id: bigint("donor_id", { mode: "bigint", unsigned: true }).notNull(),
    donor_external_id: varchar("donor_external_id", { length: 36 }).notNull(), // uuid
    //subscription_id入れたいけどWebhookがほぼ同時に来る関係でsubscription_external_idのみにする
    subscription_external_id: varchar("subscription_external_id", {
      length: 36,
    }), //uuid
    stripe_subscription_id: varchar("stripe_subscription_id", {
      length: 100,
    }).notNull(),
    donation_project: varchar("donation_project", { length: 50 }).notNull(),
    amount: int("amount", { unsigned: true }).notNull(),
    currency: varchar("currency", { length: 3 }).notNull(),
    type: varchar("type", {
      length: 20,
      enum: ["ONE_TIME", "MONTHLY", "YEARLY"],
    }).notNull(),
    tax_deduction_certificate_url: varchar("tax_deduction_certificate_url", {
      length: 1023,
    }).notNull(),
    stripe_object: json("stripe_object"), //"一回の場合はpayment_intent、毎月の場合はinvoiceのobjectを保存"
    created_at: timestamp("created_at", { mode: "date" }).defaultNow(),
    updated_at: timestamp("updated_at", { mode: "date" }).onUpdateNow(),
  },
  (table) => {
    return {
      donation_id_idx: index("donation_id_idx").on(table.donation_id),
      donor_external_id_idx: index("donor_external_id_idx").on(
        table.donor_external_id
      ),
    };
  }
);

export type Donor = typeof donor;
export type Transaction = typeof transaction;
export type Subscription = typeof subscription;
