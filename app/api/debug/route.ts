import { db } from "@/server/db/db";
import { donors } from "@/server/db/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const donorSchema = z.object({
  checkout_session_id: z.string().max(500),
  name: z.string().max(256),
  is_corporate:z.boolean(),
  corporate_number:z.string().optional(),
  email: z.string().email().max(256),
  phone: z.string().max(11),
  country: z.string().max(256),
  postal_code: z.string().max(256),
  address: z.string().max(500),
  amount: z.number().nonnegative(),
  selected_project: z.string().max(100),
  is_public: z.boolean().default(false),
  display_name: z.string().max(300),
  message: z.string().max(1000).optional(),
});
type DonorSchema = z.infer <typeof donorSchema>

export async function GET() {
  try {
    // Test the connection by performing a simple query
    const response = await db.query.donors.findMany();
    const result = response.map((row) => ({
      ...row,
      id: row.id.toString(),
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
      message: "Failed to connect to the database",
      error: (error as Error).message,
    });
  }
}

export async function POST(req: NextRequest ) {
  try {
    const body : DonorSchema  = await req.json();

    const validation = donorSchema.safeParse(body);
    if (!validation.success)
      return NextResponse.json({ status: 403, error: validation.error.errors });

    const { "0": { insertId: donorId } } = await db.insert(donors).values({
      checkout_session_id: body.checkout_session_id,
      name: body.name,
      email: body.email,
      is_corporate:body.is_corporate,
      corporate_number:body.corporate_number,
      phone: body.phone,
      country: body.country,
      postal_code: body.postal_code,
      address: body.address,
      amount: body.amount,
      selected_project: body.selected_project,
      is_public: body.is_public,
      display_name: body.display_name,
      message: body.message,
      created_at: new Date(),
      updated_at: new Date(),
    });

    const response = await db.select().from(donors).where(eq(donors.id, BigInt(donorId)));

    const result = response.map((row) => ({
      ...row,
      id: Number(row.id), // Convert BigInt to a number to prevent type error
    }));

    return NextResponse.json({
      message: "Donor added successfully",
      response: result,
    });
  } catch (error) {
    console.error("Database Insertion Error:", error);
    
    return NextResponse.json({
      status: 500,
      error: {
        name: (error as Error).name,
        msg: (error as Error).message,
        stack: (error as Error).stack,
        cause: (error as Error).cause,
      },
    });
  }
}