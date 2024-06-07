import { stripe } from "@/app/utils/stripe";

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
      <div className="alert">
        <h3>支払い成功</h3>
        <p>支払いが完了しました</p>
        <p>メールにて寄付控除証明証をお送りします。</p>
      </div>
    );
  }

  return <p className="alert text-red-500">Unknown session status</p>;
};

export default checkoutReturn;
