"use client";

import { useSearchParams } from "next/navigation";
import PaymentForm from "@/components/PaymentForm";
import { Suspense } from "react";

function Payment() {
  const searchParams = useSearchParams();
  const clientSecret = searchParams.get("client-secret");

  if (!clientSecret) {
    return <span className="text-white">Client secret not found</span>;
  }
  return (
    <div className="bg-brand h-screen grid place-content-center">
      <div className="w-screen p-2">
        <PaymentForm clientSecret={clientSecret} />
      </div>
    </div>
  );
}

export default function PaymentPage() {
  return (
    <Suspense>
      <Payment />
    </Suspense>
  );
}
