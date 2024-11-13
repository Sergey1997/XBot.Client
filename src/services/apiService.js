import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL; 

// Function to create a customer
export const createCustomer = async (email) => {
  try {
    const response = await axios.post(`${API_URL}/create-customer`, { email });
    return response.data; // Return the created customer data
  } catch (error) {
    console.error('Error creating customer:', error);
    throw error; // Rethrow the error for further handling
  }
};

// Function to create a subscription
export const createSubscription = async (customerId, paymentMethodId, priceId) => {
  try {
    const response = await axios.post(`${API_URL}/create-subscription`, {
      customerId,
      paymentMethodId,
      priceId,
    });
    return response.data; // Return the created subscription data
  } catch (error) {
    console.error('Error creating subscription:', error);
    throw error; // Rethrow the error for further handling
  }
};

export const createCheckoutSession = async (email, lineItems) => {
    try {
      const response = await axios.post(`${API_URL}/subscription/create-checkout-session`, { email, lineItems });
      return response.data; // Return the session ID
    } catch (error) {
      console.error('Error creating checkout session:', error);
      throw error; // Rethrow the error for further handling
    }
  };