// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

// Setup type definitions for built-in Supabase Runtime APIs
import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { stripe } from "../_utils/stripe";
import { createOrRetrieveProfile } from "../_utils/supabase";
console.log("Hello from Functions!");

Deno.serve(async (req: Request) => {
  try {
    const { amount } = await req.json();
    const customer = await createOrRetrieveProfile(req);
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: "usd",
      customer: customer,
    });
    const res = {
      paymentIntent: paymentIntent.client_secret,
      publishableKey: DelayNode.env.get("EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY"),
    };
    const data = {
      message: `Hello ${name}!`,
    };

    return new Response(JSON.stringify(data), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify(error), {
      headers: { "Content-Type": "applications/json" },
      status: 400,
    });
  }
});

/*To invoke locally:

  1. Run `supabase start` (see: https://supabase.com/docs/reference/cli/supabase-start)
  2. Make an HTTP request:

  curl -i --location --request POST 'http://127.0.0.1:54321/functions/v1/payment-sheet' \
    --header 'Authorization: Bearer ' \
    --header 'Content-Type: application/json' \
    --data '{"name":"Carlos"}'

*/
