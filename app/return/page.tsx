"use client";

import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { retrieveCheckoutSession } from "@/api-client/payments";
import { Suspense } from "react";
import Link from "next/link";

function Return() {
  const sessionId = useSearchParams().get("session_id");

  const { data, isPending, isSuccess } = useQuery({
    queryKey: ["checkout-session", sessionId],
    queryFn: () => retrieveCheckoutSession(sessionId ?? ""),
    enabled: !!sessionId,
  });

  if (isPending)
    return (
      <div className="flex justify-center p-5">
        <span className="loading loading-dots loading-lg text-white" />
      </div>
    );

  if (isSuccess && data.session.status === "open") {
    return <p className="alert text-red-500">Payent Failed</p>;
  }

  if (isSuccess && data.session.status === "complete")
    console.log(data)
    return (
      <div className="grid place-content-center p-5">
        <div className="text-white bg-green-700 rounded-lg p-5">
          <h1 className="text-xl font-bold">支払い完了</h1>
          <div className="divider" />
          <p>
            {data.session.customer_details.name}さん、
            <br />
            {data.session.amount_total}円の寄付ありがとうございます！
            <br />
            <br />
            メールにて寄付控除証明証を
            <br />
            送信しまたのでご確認お願いします。
            <br />
            <br />
            毎月の寄付の場合、毎月受信されるメールからいつでもキャンセルできます。
            <br />
            
            
          </p>
        </div>
        <Link href="/">
          <span className="btn w-full my-3">戻る</span>
        </Link>
      </div>
    );
}

export default function ReturnPage() {
  return (
    <Suspense>
      <Return />
    </Suspense>
  );
}
