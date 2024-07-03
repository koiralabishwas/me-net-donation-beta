import { db } from "@/server/db/db";
import { table } from "console";
import { sql } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const database = await db;

    // Test the connection by performing a simple query
    const [row , column] = await database.execute(sql`SELECT * FROM new_table`);

    // If the query succeeds, return a success message
    return NextResponse.json({ message: "Database connected successfully" , row : row });
  } catch (error) {
    // If there's an error, return an error message
    return NextResponse.json({ message: "Failed to connect to the database", error: error });
  }
}
