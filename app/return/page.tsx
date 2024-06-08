"use client";

import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { retrieveCheckoutSession } from "@/api-client/payments";
import { Suspense } from "react";

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
    return (
      <div className="grid place-content-center p-5">
        <div className="text-white bg-green-700 rounded-lg p-5">
          <h1 className="text-xl font-bold">支払い成功</h1>
          <div className="divider" />
          <p>
            {data.session.customer_details.name}さん、
            <br />
            支払いが完了しました。🎉
            <br />
            <br />
            メールにて寄付控除証明証を
            <br />
            送信しまたのでご確認お願いします。
            <br />
            <br />
            毎月寄付の場合、毎月受信するメールからいつでもキャンセルできます。
          </p>
        </div>
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
