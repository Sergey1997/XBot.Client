import { useAuth } from '../context/AuthContext' // Import useAuth from AuthContext
import { createCheckoutSession } from '../services/apiService'
import { Button } from './ui/button'
const CheckoutButton = () => {
  const { user } = useAuth() // Get user from AuthContext

  const handleCheckout = async () => {
    if (!user) {
      console.error('User is not authenticated')
      return // Exit if user is not authenticated
    }

    const userEmail = user.email || 'test@gmail.com'
    const lineItems = [
      { price: 'price_1QJyBTArJXmyTfeYvsIn8FFT', quantity: 1 }, // Replace with your actual price ID
    ]

    try {
      const response = await createCheckoutSession(userEmail, lineItems) // Call the service function
      const { id } = response

      // Redirect to Stripe Checkout
      const stripe = window.Stripe('pk_test_O6QoURACZWbmsfz29j4g4RT0005NVC3ANG') // Your publishable key
      await stripe.redirectToCheckout({ sessionId: id })
    } catch (error) {
      console.error('Error during checkout:', error)
    }
  }

  return (
    <div>
      <Button className="w-3/4" onClick={handleCheckout}>
        Checkout
      </Button>
    </div>
  )
}

export default CheckoutButton
