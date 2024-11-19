import { createCheckoutSession } from '../services/apiService'

export const handleCheckout = async (email) => {
  console.log(email)

  if (!email) {
    console.error('User is not authenticated')
    return // Exit if user is not authenticated
  }

  const lineItems = [
    { price: 'price_1QJyBTArJXmyTfeYvsIn8FFT', quantity: 1 }, // Replace with your actual price ID
  ]

  try {
    const response = await createCheckoutSession(email, lineItems) // Call the service function
    console.log(response.url)
    const { id } = response

    // Redirect to Stripe Checkout
    //await stripe.redirectToCheckout({ sessionId: id })
    return response.url
  } catch (error) {
    console.error('Error during checkout:', error)
  }
}
