import { retrieveCheckoutSession } from "@/server/stripe";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic"; // defaults to force-static

export async function GET(
  _: NextRequest,
  context: { params: { session_id: string } }
) {
    const session = await retrieveCheckoutSession(context.params.session_id);
  return NextResponse.json({ status: 200, message: "Success", session });
}

//NOTE: underscore_ means this parameter is expeced !! but not used inside function .
// the context obj is
// {
//   params: {
//     session_id: 'cs_test_a1y95JWBHwOZx8FweUejjZ1H7zFZTiElltAeNR6H8oLIyFZQibM7Z5bDYA'
//   }
// }
//
