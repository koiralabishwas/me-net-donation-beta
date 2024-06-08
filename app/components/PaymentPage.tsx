"use client";
import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  EmbeddedCheckout,
  EmbeddedCheckoutProvider,
} from "@stripe/react-stripe-js";

type Props = {
  clientSecret: string;
};

// must call load stripe outside component to avoid rerender
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

export default function PaymentPage({ clientSecret }: Props) {
  return (
    <EmbeddedCheckoutProvider
      stripe={stripePromise}
      options={{ clientSecret: clientSecret }}
    >
      <EmbeddedCheckout />
    </EmbeddedCheckoutProvider>
  );
}
