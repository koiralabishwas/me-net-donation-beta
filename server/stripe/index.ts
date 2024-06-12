import Stripe from "stripe";
import { handleError } from "@/server/utils/error";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
// product は stripeの管理画面で手動絵作る

export async function createCustomer(
  createCustomerParam: Stripe.CustomerCreateParams
): Promise<Stripe.Customer> {
  return await handleError(
    () => stripe.customers.create(createCustomerParam),
    "An unknown error occurred when creating customer"
  );
}

export async function createPrice(
  createPriceParam: Stripe.PriceCreateParams
): Promise<Stripe.Price> {
  return await handleError(
    () => stripe.prices.create(createPriceParam),
    "An unknown error occurred when creating price"
  );
}

export async function searchPrice(
  productId: string,
  amount: number
): Promise<Stripe.Price> {
  return (
    await handleError(
      () =>
        stripe.prices.search({
          query: `active:'true' AND product:'${productId}' AND metadata['amount']:'${amount}'`,
        }),
      "An unknown error occurred when searching price"
    )
  ).data[0];
  // data[o] is returned
}

export async function createCheckoutSession(
  createSessionParam: Stripe.Checkout.SessionCreateParams
): Promise<Stripe.Checkout.Session> {
  return await handleError(
    () => stripe.checkout.sessions.create(createSessionParam),
    "An unknown error occured when creating session"
  );
}

export async function retrieveCheckoutSession(
  sessionId: string
): Promise<Stripe.Checkout.Session> {
  return await handleError(
    () => stripe.checkout.sessions.retrieve(sessionId),
    "An unknown error occured when retrieving session"
  );
}
