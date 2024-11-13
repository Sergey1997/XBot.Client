import { CardElement, useStripe, useElements, Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import Button from '@mui/material/Button';

const stripePromise = loadStripe('pk_test_O6QoURACZWbmsfz29j4g4RT0005NVC3ANG');

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const card = elements.getElement(CardElement);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: card,
    });

    if (error) {
      console.error('Error creating payment method:', error);
    } else {
      console.log('Payment method created:', paymentMethod);
      // Further processing can be done here, like sending paymentMethod.id to your server
    }
  };

  return (
      <form onSubmit={handleSubmit}>
        <CardElement options={{ hidePostalCode: true }} />
        <Button variant="contained" type="submit" color="primary" sx={{ mt: 2 }} disabled={!stripe}>
          Subscribe now
        </Button>
      </form>
  );
};

export default CheckoutForm;