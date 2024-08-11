
// // server.js
// //
// // Use this sample code to handle webhook events in your integration.
// //
// // 1) Paste this code into a new file (server.js)
// //
// // 2) Install dependencies
// //   npm install stripe
// //   npm install express
// //
// // 3) Run the server on http://localhost:4242
// //   node server.js

// // The library needs to be configured with your account's secret key.
// // Ensure the key is kept out of any version control system you might be using.
// const stripe = require('stripe')('sk_test_...');
// const express = require('express');
// const app = express();


// // This is your Stripe CLI webhook secret for testing your endpoint locally.
// const endpointSecret = "whsec_66d1bc562f01853a93c4c10ab740b0bbd30aa4084a2fd9e5a300473917bc2f8f";

// app.post('/webhook', express.raw({type: 'application/json'}), (request, response) => {
//   const sig = request.headers['stripe-signature'];

//   let event;

//   try {
//     event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
//   } catch (err) {
//     response.status(400).send(`Webhook Error: ${err.message}`);
//     return
//   }

//   // Handle the event
//   switch (event.type) {
//     case 'invoice.payment_succeeded':
//       const invoicePaymentSucceeded = event.data.object;
//       // Then define and call a function to handle the event invoice.payment_succeeded
//       break;
//     // ... handle other event types
//     default:
//       console.log(`Unhandled event type ${event.type}`);
//   }

//   // Return a 200 response to acknowledge receipt of the event
//   response.send();
// });

// app.listen(4242, () => console.log('Running on port 4242'));

import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(request:NextRequest) {
  try {
    const event = (await request.json()) as Stripe

    NextResponse.json(event)
    
  
} catch (err) {
  NextResponse.json({"ERR" : err , status : 501 , message : "Errors Caught"})
}
}