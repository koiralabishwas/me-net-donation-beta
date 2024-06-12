import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

import { stripe } from "@/app/utils/stripe";
import { requestBodySchema } from "./route.schema";
import Stripe from "stripe";
import { createCustomer } from "@/server/stripe";

type RequestBodyInterface = z.infer<typeof requestBodySchema>;

export async function POST(req: NextRequest, res: NextResponse) {
  const body: RequestBodyInterface = await req.json();
  const validation = requestBodySchema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.errors, { status: 400 });

  const { customer, product_id, price } = body;

  console.log("[body]", body)

  //TODO: do I neet to retrive customers 
  const { id : customerId } = await createCustomer(customer)

          let priceId: string | undefined;
          const existingPrice = await checkPriceExistence(product_id, price);

          console.log("[existingPrice]", existingPrice)

          if (!existingPrice) {
            const { id } = await stripe.prices.create({
              product: product_id,
              currency: "jpy",
              // amount passed from the body
              unit_amount: price,
              metadata : {
                // stripe query cannot retrive from unit_amount
                // use this medatta.price to retrive price from amount
                amount : price
              }
            });
            priceId = id;
          } else {
            priceId = existingPrice.id;
          }

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

const checkPriceExistence = async (productId: string, amount: number):  Promise<Stripe.Price> => {
  console.log("[productId]", productId, "[amount]", amount)

  const { data } = await stripe.prices.search({
    query: `active:\'true\' AND product:\'${productId}\' AND metadata[\'amount\']:\'${amount}\'` 
  })

  console.log("[data]", data)
  
  return  data[0]

  // const prices = await stripe.prices.list({
  //   product: productId,
  // });

  // const matchingPrice = prices.data.find(
  //   (price) => price.unit_amount === amount
  // );

  // if (matchingPrice) {
  //   console.log("Price exists:", matchingPrice.id);
  //   return matchingPrice.id;
  // } else {
  //   console.log("Price not found .... Creating New Price ");
  //   return undefined;
  // }
};

const fooPriceExistance = async () => {
  

}
