import React, { useState } from 'react';
import { Typography, Grid2, Box, Paper, CircularProgress } from '@mui/material'; // Added CircularProgress import
import { styled } from '@mui/system';
import { useAuth } from '../context/AuthContext';
import CheckoutForm from '../components/CheckoutForm';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material'; // Import modal components
import CheckoutButton from '../components/CheckoutButton';
import { Button } from "../components/ui/button";
import { Table } from '../components/ui/table';
import { Link } from "react-router-dom";

const Home = () => {
  const stripePromise = loadStripe('pk_test_O6QoURACZWbmsfz29j4g4RT0005NVC3ANG');

  const { user, handleGoogleSignIn } = useAuth();

  const [openModal, setOpenModal] = useState(false); // State to manage modal open/close

  const handleOpenModal = () => {
    setOpenModal(true); // Function to open modal
  };

  const handleCloseModal = () => {
    setOpenModal(false); // Function to close modal
  };

  return (
    <main className="flex flex-1 flex-col items-center py-16">
    <div className="flex flex-col items-center">
  <div className="flex flex-col lg:flex-row items-center gap-8 p-8 max-w-6xl w-full">
    <div className="flex flex-col space-y-4 lg:w-1/2 w-full">
      <h1 className="text-5xl font-bold">
       Professional AI Comments Bot for Twitter.
      </h1>
      <p className="text-gray-600 text-lg">
      Boost your Twitter engagement effortlessly with our AI-powered comments bot. Designed to help you connect with a broader audience and enhance your online presence on Twitter.
      </p>
      <div className="flex flex-col space-y-2">
        <Link onClick={handleGoogleSignIn}>
          <Button className="bg-blue-500 text-white  w-full lg:w-1/2">Get Your AI Comments Bot Now</Button>
        </Link>
        <p className="text-sm text-gray-500 italic">
        Trusted by brands and influencers worldwide for increasing engagement and reach.
        </p>
      </div>
      <div className="mt-4 text-gray-500">
        <span>Already a member? </span>
        <Link className="text-blue-600 hover:underline" onClick={handleGoogleSignIn}>
          Sign In
        </Link>
        {/* {user && (
          <CheckoutButton />
        )} */}
      </div>
    </div>
    <div className="lg:w-1/2 w-full mt-8 lg:mt-0">
      <img
        src="buy-twitter-followers.webp"
        alt="AI Headshot Illustration"
        className="rounded-lg object-cover w-full h-full"
      />
    </div>
  </div>
</div>
    </main>
  );
};

export default Home;