require("dotenv").config();
const functions = require("firebase-functions");
const Stripe = require("stripe");

const stripe = Stripe(process.env.stripe_secret_key);

exports.helloWorld = functions.https.onRequest((req, res) => {
  res.send("Hello, World!");
});
