import { sendSuccesEmail } from "@/app/api-services/email";
import {stripe} from "../../utils/stripe"
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest ) {
  const payload = await req.text();
  const response = await JSON.parse(payload)
  const sig = req.headers.get("Stripe-Signature");


  try {
    let event = stripe.webhooks.constructEvent(
      payload , sig! , process.env.STRIPE_WEBHOOK_SECRET!
    )

    console.log("event", event.type)

    switch (event.type) {
      case 'checkout.session.completed':
        const checkoutSessionCompleted = event.data.object;
        const customerEmail =  event.data.object.customer_details?.email

        await sendSuccesEmail({
          recipient: customerEmail!,
          subject: "寄付完了",
          message:
            "寄付にご協力いただきありがとうございます。寄付処理が完了したことをお知らせします。",
        });
        // Then define and call a function to handle the event checkout.session.completed
        
        break;
      // ... handle other event types
      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    return NextResponse.json({status : "succeed" , event : event.type})
  } catch (error) {
    return NextResponse.json({status : "failed"  , error})
  }
}
