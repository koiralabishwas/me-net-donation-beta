import { stripe } from "@/app/utils/stripe";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic"; // defaults to force-static

export async function GET(
  _: NextRequest,
  context: { params: { session_id: string } }
) {
  let session;

  try {
    session = await stripe.checkout.sessions.retrieve(
      context.params.session_id
    );
  } catch (error) {
    return NextResponse.json({ status: 500, message: "Server error", error });
  }

  return NextResponse.json({ status: 200, message: "Success", session });
}
