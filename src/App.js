import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Footer from './components/Footer'
import { AuthProvider } from './context/AuthContext'
import './App.css' // Importing App.css
import { Suspense, useEffect } from 'react'
import { Toaster } from './components/ui/toaster'
import ExplainerSection from './components/ui/composits/ExplainerSection'
import PricingSection from './components/ui/composits/PricingSection'
import TwitterCallbackPage from './components/TwitterCallbackPage'
import Dashboard from './pages/Dashboard'
import { useDispatch } from 'react-redux'
import { getUserWithSubscriptionFromLocalStorage } from './utils/localStorage'
import { setUser } from './redux/slicers/userSlice'
import { configureAuthPersistence } from './firebase/auth'

export default function App() {
  console.log(`[App] Current environment: ${process.env.NODE_ENV}`)
  useEffect(() => {
    configureAuthPersistence()
  }, [])
  const dispatch = useDispatch()

  var user = getUserWithSubscriptionFromLocalStorage()
  dispatch(setUser(user))

  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-white">
        <Suspense fallback={<div>Loading...</div>}>
          <Navbar />
        </Suspense>

        {/* Define Routes */}
        <Routes>
          <Route
            path="/"
            element={
              <div className="flex flex-col items-center">
                {/* Components that should appear on the homepage */}
                <Home />
                <ExplainerSection />
                <PricingSection />
              </div>
            }
          />
          {/* Twitter Callback and Dashboard on their own distinct paths */}
          <Route path="/twitter/callback" element={<TwitterCallbackPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>

        <div className="flex flex-col items-center">
          {/* Footer should likely be outside to be on every page at the bottom */}
          <Footer />
        </div>

        <Toaster />
      </div>
    </Router>
  )
}
