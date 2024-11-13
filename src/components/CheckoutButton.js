import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';
import { useAuth } from '../context/AuthContext'; // Import useAuth from AuthContext
import { createCheckoutSession } from '../services/apiService';
const CheckoutButton = () => {
    const { user } = useAuth(); // Get user from AuthContext

  const handleCheckout = async () => {

    if (!user || !user.email) {
        console.error('User is not authenticated or email is not available.');
        return; // Exit if user is not authenticated
      }
    const lineItems = [
      { price: 'price_1QJyBTArJXmyTfeYvsIn8FFT', quantity: 1 }, // Replace with your actual price ID
    ];

    try {
      const response = await createCheckoutSession(user.email, lineItems); // Call the service function
      const { id } = response;

      // Redirect to Stripe Checkout
      const stripe = window.Stripe('pk_test_O6QoURACZWbmsfz29j4g4RT0005NVC3ANG'); // Your publishable key
      await stripe.redirectToCheckout({ sessionId: id });
    } catch (error) {
      console.error('Error during checkout:', error);
    }
  };

  return (
    <div>
      <Button onClick={handleCheckout} variant="contained" color="primary" sx={{ mt: 2 }}>
        Checkout
      </Button>
    </div>
  );
};

export default CheckoutButton;