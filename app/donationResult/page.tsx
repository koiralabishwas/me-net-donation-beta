import { stripe } from "@/app/utils/stripe";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";

async function getSession(sessionId: string) {
  const session = await stripe.checkout.sessions.retrieve(sessionId);
  return session;
}

export default async function checkoutReturn({ searchParams }: Params) {
  const sessionId = searchParams.session_id;
  const session = await getSession(sessionId);

  if (session?.status === "open") {
    return <p className="alert text-red-500">Payent Failder</p>;
  }

  if (session?.status === "complete")
    return (
      <div className="alert">
        <h3 >支払い成功</h3>
        <p>支払いが完了しました</p>
        <p>メールにて寄付控除証明証をお送りします。</p>
      </div>
    );
}
