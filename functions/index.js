require("dotenv").config();
const { onRequest } = require("firebase-functions/v2/https");

exports.helloWorld = onRequest((req, res) => {
  res.send(`I am a function. ${process.env.STRIPE_SECRET_KEY}`);
});