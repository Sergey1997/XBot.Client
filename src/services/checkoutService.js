import { createCheckoutSession, getStripePayments } from "@invertase/firestore-stripe-payments";
import { getApp } from "@firebase/app";
import { getCheckoutUrl } from "./account/stripePayment"

export const handleCheckout = async (email) => {
  console.log("User email:", email);

  if (!email) {
    console.error('User is not authenticated');
    return; // Exit if user is not authenticated
  }

  const app = getApp();
  const payments = getStripePayments(app, {
    productsCollection: 'products',
    customersCollection: 'customers',
  });

  // Ensure the price ID is a non-empty, correctly formatted string
  const priceID = 'price_1QMz9mArJXmyTfeYjooyiQQR';  // Replace with your actual price ID from Stripe
  if (typeof priceID !== 'string' || !priceID.startsWith('price_')) {
    console.error('Invalid Price ID:', priceID);
    return;
  }
  
  const lineItems = [{ price: priceID, quantity: 1 }];

  try {
    const checkoutUrl = await getCheckoutUrl(app, priceID);

    console.log("Checkout session URL:", checkoutUrl);
    // Redirect to Stripe Checkout
    //window.location.href = session.url;
    return checkoutUrl;
  } catch (error) {
    console.error('Error during checkout:', error);
  }
};