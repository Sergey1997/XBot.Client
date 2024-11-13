import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Footer from "./components/Footer";
import { AuthProvider } from "./context/AuthContext";
import { ThemeProvider } from '@mui/material';
import theme from './theme'; // Import your theme
import './App.css'; // Importing App.css
import { Suspense } from "react";
import { Toaster } from "./components/ui/toaster";
import ExplainerSection from "./components/ui/ExplainerSection";
import PricingSection from "./components/ui/PricingSection";

export default function App({ children }) {

  return (
    <ThemeProvider theme={theme}>
    <AuthProvider>
      <Router>
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <section>
          <Suspense
            fallback={
              <div className="flex w-full px-4 lg:px-40 py-4 items-center border-b text-center gap-8 justify-between h-[69px]" />
            }
          >
            <Navbar />

          </Suspense>
        </section>
        <div className="flex flex-col items-center">
        <Home />
        <ExplainerSection />
        <PricingSection />
        <Footer />
        <Toaster />
        </div>
      </body>
    </html>
    </Router>
    </AuthProvider>
    </ThemeProvider>
  );
}
