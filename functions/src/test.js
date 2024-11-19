const {initializeApp} = require("firebase-admin/app");
const {onRequest} = require("firebase-functions/v2/https");

initializeApp();
exports.test = onRequest((req, res) => {
  res.send("Hello from Firebase!");
});
