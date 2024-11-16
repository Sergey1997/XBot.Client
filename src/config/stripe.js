import { Stripe } from 'stripe'

const getStripe = () => {
  const stripePublicKey = 'pk_test_O6QoURACZWbmsfz29j4g4RT0005NVC3ANG'
  return new Stripe(stripePublicKey)
}

export default getStripe
