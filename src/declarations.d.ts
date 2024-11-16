import { Stripe, StripeConstructor } from '@stripe/stripe-js'

declare global {
  interface Window {
    Stripe?: StripeConstructor
  }
}
