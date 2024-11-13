import React, { useState } from 'react';
import { Typography, Button, Grid2, Box, Paper, ThemeProvider, createTheme, CircularProgress } from '@mui/material'; // Added CircularProgress import
import { styled } from '@mui/system';
import { useAuth } from '../context/AuthContext';
import CheckoutForm from '../components/CheckoutForm';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material'; // Import modal components
import CheckoutButton from '../components/CheckoutButton';

const theme = createTheme({
  breakpoints: {
    values: {
      laptop: 1024,
      tablet: 640,
      mobile: 0,
      desktop: 1280,
    },
  },
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h5: {
      fontWeight: 600,
    },
    subtitle1: {
      fontWeight: 500,
    },
  },
});

const StyledBox = styled(Box)(({ theme }) => ({
  flexGrow: 1,
  overflow: 'hidden',
  padding: theme.spacing(2),
}));

const StyledPaper = styled(Paper)(({ theme }) => ({
  width: '100%',
  margin: 'auto',
  overflow: 'hidden',
  padding: theme.spacing(2),
}));

const StyledImage = styled('img')({
  width: '100%',
  height: 'auto'
});

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
    <ThemeProvider theme={theme}>
      <StyledBox>
        <StyledPaper>
          <Grid2 container spacing={2} alignItems="center" flexDirection="row" marginTop={5}>
            <Grid2 size={{mobile: 12, laptop: 6}} display="flex" alignItems="center" justifyContent="center">
              <StyledImage src="buy-twitter-followers.webp" alt="Twitter Bot" />
            </Grid2>
            <Grid2 size={{mobile: 12, laptop: 6}} display="flex" flexDirection="column" justifyContent="center" textAlign="center">
              <Typography variant="h5" gutterBottom>
                Empower Your Twitter Experience
              </Typography>
              <Typography variant="subtitle1" gutterBottom>
                Subscribe for only $8.99/month
              </Typography>
              <Typography variant="body2" gutterBottom>
                Activate your Twitter(X) Bot today and start automating your Twitter interactions with ease! Our advanced features allow you to stay active, engage with followers, and grow your network without the constant manual effort.
              </Typography>
              <CheckoutButton />
              <Dialog 
                open={openModal} 
                onClose={handleCloseModal} 
                PaperProps={{
                  style: {
                    width: '500px',
                    borderRadius: '16px',
                    padding: '20px',
                    boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
                  },
                }}
              >
                <DialogTitle sx={{ fontWeight: 'bold', fontSize: '1.5rem', textAlign: 'center' }}>Subscribe</DialogTitle>
                <DialogContent>
                <CircularProgress />
                <CheckoutButton />

                </DialogContent>
                <DialogActions>
                  <Button 
                    onClick={handleCloseModal} 
                    variant="outlined" 
                    color="secondary" 
                    sx={{ borderRadius: '8px' }}
                  >
                    Close
                  </Button>
                </DialogActions>
              </Dialog>
              {!user && <Button variant="contained" color="secondary" onClick={handleGoogleSignIn} sx={{ mt: 2, marginRight: 1 }}>
                Sign in with Google
              </Button>}
            </Grid2>
          </Grid2>
        </StyledPaper>
      </StyledBox>
    </ThemeProvider>
  );
};

export default Home;