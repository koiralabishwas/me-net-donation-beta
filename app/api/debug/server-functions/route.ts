import { createCustomer, createPrice } from "@/server/stripe";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest) {
  const body = await req.json()
  const result = await createCustomer(body)
  
  return NextResponse.json( await result)

  
}