import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

import { stripe } from "@/app/utils/stripe";
import { requestBodySchema } from "./route.schema";
import Stripe from "stripe";
import { createCustomer, findOrCreatPrice,  } from "@/server/stripe";

type RequestBodyInterface = z.infer<typeof requestBodySchema>;

export async function POST(req: NextRequest, res: NextResponse) {
  const body: RequestBodyInterface = await req.json();
  const validation = requestBodySchema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.errors, { status: 400 });

  const { customer, product_id, price } = body;

  console.log("[body]", body);

  //TODO: do I need to retrive customers

  const { id: customerId } = await createCustomer(customer);

  const { id: priceId }: Stripe.Price = await findOrCreatPrice(
    product_id,
    price
  );



  const session = await stripe.checkout.sessions.create({
    ui_mode: "embedded",
    customer: customerId,
    payment_method_types: ["card", "konbini"],
    line_items: [
      {
        price: priceId,
        quantity: 1,
      },
    ],
    automatic_tax: { enabled: false },
    mode: "payment",
    return_url: `${req.headers.get(
      "origin"
    )}/return?session_id={CHECKOUT_SESSION_ID}`,
  });

  return NextResponse.json({
    id: session.id,
    client_secret: session.client_secret,
    priceId,
  });
}
