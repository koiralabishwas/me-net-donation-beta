import { sendErrorEmail, sendSuccesEmail } from "@/app/api-services/email";
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

    let customerEmail : string | undefined | null ;

    switch (event.type) {
      case 'checkout.session.completed':
        const checkoutSessionCompleted = event.data.object;
         customerEmail =  event.data.object.customer_details?.email

        await sendSuccesEmail({
          recipient: customerEmail!,
          subject: "寄付完了",
          message:
            "寄付にご協力いただきありがとうございます。寄付処理が完了したことをお知らせします。",
        });
        // Then define and call a function to handle the event checkout.session.completed
        
        break;

        case 'checkout.session.expired' :
          const checkoutSessionExpired = event.data.object;
          customerEmail = event.data.object.customer_details?.email

          await sendErrorEmail({
            recipient : customerEmail!,
            subject : "寄付失敗",
            message : "セッションの期限切れにより、寄付処理が失敗しました。"
          })
          
      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    return NextResponse.json({status : "succeed" , event : event.type})
  } catch (error) {
    return NextResponse.json({status : "failed"  , error})
  }
}
