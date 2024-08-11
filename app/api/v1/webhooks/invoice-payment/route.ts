import { NextResponse, NextRequest } from 'next/server';
import Stripe from 'stripe';

/**
 * Webhook handler for `invoice.paid` events
 */

/**
 * When testing the webhook locally, use the Stripe CLI:
 * stripe listen --forward-to localhost:3000/api/v1/webhook
 * to forward events to your local server.
 */

export async function POST(request: NextRequest) {
  try {
    const event = (await request.json()) as Stripe.Event;

    if (event.type !== 'invoice.paid') {
      return NextResponse.json({
        status: 400,
        error: 'Bad Request. Unsupported event type',
      });
    }

    const invoice = event.data.object as Stripe.Invoice;
    const { customer_email } = invoice;

    if (!customer_email || customer_email.length === 0) {
      return NextResponse.json({
        status: 400,
        error: 'Bad Request. Customer email not found',
      });
    }

    return NextResponse.json({
      status: 200,
      message: 'Webhook processed successfully, invoice paid.',
      invoice,
    });
  } catch (error) {
    return NextResponse.json({
      status: 500,
      message: 'Server error',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
}
