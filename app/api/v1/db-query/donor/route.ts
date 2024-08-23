import { db } from "@/server/db/db";
import { donor } from "@/server/db/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { donorSchema } from "./donor.schema";
import { error } from "console";



export async function POST(req : NextRequest , res : NextResponse) {
 const body = await req.json()
 const validation = donorSchema.safeParse(body)

 if (!validation.success) {
  return NextResponse.json(validation.error.errors, { status: 400 });
 }

 try {
  const data = await db.insert(donor).values(body).execute()
  return NextResponse.json({status : 201 , inserted : data})
 } catch (e) {
  return NextResponse.json({status : 500 , error : e})
 }
  
}


export async function GET() {
  try {
    // Test the connection by performing a simple query
    const response = await db.query.donor.findMany();
    const result = response.map((row) => ({
      ...row,
      donor_id: row.donor_id.toString(), // Convert BigInt to string
    }));

    // If the query succeeds, return a success message
    return NextResponse.json({
      message: "Database connected successfully",
      row: result,
    });
  } catch (error) {
    console.error("Database Connection Error:", error);

    // If there's an error, return an error message
    return NextResponse.json({
      message: "Failed with db communication",
      error: (error as Error).message,
    });
  }
}
