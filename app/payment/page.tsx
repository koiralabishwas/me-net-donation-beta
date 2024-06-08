"use client";

import { useSearchParams } from "next/navigation";
import PaymentPage from "@/components/PaymentPage";

export default function PaymentRoute() {
  const searchParams = useSearchParams();
  const clientSecret = searchParams.get("client-secret");

  if (!clientSecret) {
    return <span className="text-white">Client secret not found</span>;
  }

  return (
    <div className="bg-brand h-screen grid place-content-center">
      <div className="w-screen p-2">
        <PaymentPage clientSecret={clientSecret} />
      </div>
    </div>
  );
}
