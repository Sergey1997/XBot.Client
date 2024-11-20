"use client";

import { getAuth } from "firebase/auth";
import { addDoc, collection, getFirestore, onSnapshot } from "firebase/firestore";
import { getFunctions, httpsCallable } from "firebase/functions";

export const getCheckoutUrl = async (app, priceId) => {
  const auth = getAuth(app);
  if (!auth.currentUser) throw new Error("User is not authenticated");
  const userId = auth.currentUser.uid;

  const db = getFirestore(app);
  const checkoutSessionRef = collection(db, "customers", userId, "checkout_sessions");

  const docRef = await addDoc(checkoutSessionRef, {
    price: priceId,
    success_url: window.location.origin,
    cancel_url: window.location.origin,
  });

  return new Promise((resolve, reject) => {
    const unsubscribe = onSnapshot(docRef, (snap) => {
      const data = snap.data();
      if (data.error) {
        unsubscribe();
        reject(new Error(`An error occurred: ${data.error.message}`));
      }
      if (data.url) {
        console.log("Stripe Checkout URL:", data.url);
        unsubscribe();
        resolve(data.url);
      }
    });
  });
};

export const getPortalUrl = async (app) => {
  const auth = getAuth(app);
  if (!auth.currentUser) throw new Error("User is not authenticated");
  const user = auth.currentUser;

  try {
    const functions = getFunctions(app, "us-central1");
    const functionRef = httpsCallable(functions, "ext-firestore-stripe-payments-createPortalLink");
    const { data } = await functionRef({
      customerId: user.uid,
      returnUrl: window.location.origin,
    });
    console.log("Reroute to Stripe portal: ", data.url);

    return new Promise((resolve, reject) => {
      if (data.url) {
        resolve(data.url);
      } else {
        reject(new Error("No url returned"));
      }
    });
  } catch (error) {
    console.error(error);
    throw error; // Rethrow or handle appropriately
  }
};