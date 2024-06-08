import Stripe from "stripe";
import { FormData } from "../components/DonationForm";

// do not mistake endpoints !!!
export const createCheckoutSession = async (formData: FormData) => {
  const res = await fetch("/api/v1/checkout-sessions/create", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  });
  const data = await res.json();
  return data.client_secret;
};

export const retrieveCheckoutSession = async (sessionId: string) => {
  const res = await fetch(`/api/v1/checkout-sessions/retrieve/${sessionId}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  return await res.json();
};
