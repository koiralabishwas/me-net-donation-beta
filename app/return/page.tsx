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
    return <p className="alert text-red-500">Payent Failed</p>;
  }

  if (session?.status === "complete")
    return (
      <div className="grid place-content-center p-5">
        <div className="text-white bg-green-700 rounded-lg p-5">
          <h1 className="text-xl font-bold">支払い成功</h1>
          <div className="divider" />
          <p>
            支払いが完了しました。
            <br />
            メールにて寄付控除証明証をお送りします。
          </p>
        </div>
      </div>
    );
}
