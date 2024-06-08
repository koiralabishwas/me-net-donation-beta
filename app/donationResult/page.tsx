"use client"
import { stripe } from "@/app/utils/stripe";
import { headers } from "next/headers";
import Link from "next/link";

async function getSession(sessionId: string) {
  const session = await stripe.checkout.sessions.retrieve(sessionId);
  return session;
}

interface CheckoutReturnProps {
  searchParams: {
    session_id: string;
  };
}

const checkoutReturn = async ({ searchParams }: CheckoutReturnProps) => {
  const sessionId = searchParams.session_id;
  const session = await getSession(sessionId);

  if (session?.status === "open") {
    return <p className="alert text-red-500">Payment Failed</p>;
  }

  if (session?.status === "complete") {
    return (
      <div className="text-white text-xl ">
        <h3 className="alert">支払い成功</h3>
        <p>支払い処理が完了しました</p>
        <p>メールにて寄付控除証明証をお送りします。</p>
        <div className="btn btn-primary">
          <a href="/">
            <p>寄付ページに戻る</p>
          </a>
        </div>
      </div>
    );
  }

  return <p className="alert text-red-500">Unknown session status</p>;
};

export default checkoutReturn;
