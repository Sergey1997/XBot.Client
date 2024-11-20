import axios from 'axios'

const API_URL = process.env.REACT_APP_API_URL

// Function to create a customer
export const createCustomer = async (email) => {
  try {
    const response = await axios.post(`${API_URL}/create-customer`, { email })
    return response.data // Return the created customer data
  } catch (error) {
    console.error('Error creating customer:', error)
    throw error // Rethrow the error for further handling
  }
}

// Function to create a subscription
export const createSubscription = async (
  customerId,
  paymentMethodId,
  priceId
) => {
  try {
    const response = await axios.post(`${API_URL}/create-subscription`, {
      customerId,
      paymentMethodId,
      priceId,
    })
    return response.data // Return the created subscription data
  } catch (error) {
    console.error('Error creating subscription:', error)
    throw error // Rethrow the error for further handling
  }
}

export const createCheckoutSession = async (email, lineItems) => {
  try {
    const response = await axios.post(
      `https://createcheckoutsession-fi7qicwivq-uc.a.run.app`,
      { email, lineItems }
    )
    console.log(response)
    return response.data // Return the session ID
  } catch (error) {
    console.error('Error creating checkout session:', error)
    throw error // Rethrow the error for further handling
  }
}

// Function to initiate Twitter authentication via server
export const initiateTwitterAuth = async () => {
  try {
    const response = await axios.get(`${API_URL}/auth/twitter`)
    console.log(response)
    return response.data // Return the redirect URL or relevant data
  } catch (error) {
    console.error('Error initiating Twitter auth:', error)
    throw error // Rethrow the error for further handling
  }
}

// Function to handle Twitter callback via server
export const handleTwitterCallback = async (oauthToken, oauthVerifier) => {
  try {
    const response = await axios.get(`${API_URL}/twitter/callback`, {
      params: {
        oauth_token: oauthToken,
        oauth_verifier: oauthVerifier,
      },
    })
    return response.data // Return the access token data
  } catch (error) {
    console.error('Error handling Twitter callback:', error)
    throw error // Rethrow the error for further handling
  }
}
