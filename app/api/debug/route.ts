import { db } from "@/server/db/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const database = db;

    // Test the connection by performing a simple query
    const response = await database.query.donors.findMany();
    const result = response.map(row => ({
      ...row,
      id: row.id.toString(),
    }));

    // If the query succeeds, return a success message
    return NextResponse.json({ message: "Database connected successfully", row: result });
  } catch (error) {
    console.error('Database Connection Error:', error);

    // If there's an error, return an error message
    return NextResponse.json({ message: "Failed to connect to the database", error: (error as Error).message });
  }
}
