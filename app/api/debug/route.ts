import { db } from "@/server/db/db";
import { donor } from "@/server/db/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

// Define the Zod schema for validation
const donorSchema = z.object({
  checkout_session_id: z.string().max(500),
  name: z.string().max(256),
  is_corporate: z.boolean(),
  corporate_number: z.string().optional(),
  email: z.string().email().max(256),
  phone: z.string().max(15),
  country_code: z.string().max(2),
  postal_code: z.string().max(10),
  address: z.string().max(255),
  amount: z.number().nonnegative(),
  selected_project: z.string().max(100),
  is_public: z.boolean().default(false),
  display_name: z.string().max(255),
  message: z.string().max(1000).optional(),
});
type DonorSchema = z.infer<typeof donorSchema>;

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