import { sendSuccesEmail } from "@/app/api-services/email";
import { NextResponse, NextRequest } from "next/server";
import Stripe from "stripe";

/**
 * checkout.session.complete用のWebhook
 */

/** 
 * webhook をlocalで動かす際には stripe cli を使う
 * stripe listen --forward-to localhost:3000/api/v1/webhook
 *  でローカルサーバーにフォワーディングする
 * 
 */


export async function POST(request: NextRequest) {
  try {
    const event =
      (await request.json()) as Stripe.CheckoutSessionCompletedEvent;

    const { customer_details } = event.data.object;

    if (!customer_details?.email || customer_details?.email.length === 0) {
      return NextResponse.json({
        status: 400,
        error: "Bad Request. Email not found",
      });
    }

    await sendSuccesEmail({
      recipient: customer_details?.email,
      subject: "寄付完了",
      message:
        "寄付にご協力いただきありがとうございます。寄付処理が完了したことをお知らせします。",
    });

    return NextResponse.json({
      status: 200,
      message: "Webhook processed successfully , email sent.",
    });
  } catch (error) {
    return NextResponse.json({ status: 500, message: "Server error", error });
  }
}
