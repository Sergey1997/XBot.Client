const functions = require("firebase-functions");
const Stripe = require("stripe");

const stripe = Stripe(functions.config().stripe.secret_key);

module.exports = stripe;
