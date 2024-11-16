import { createContext, useContext, useEffect, useState } from 'react'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import {
  onAuthStateChanged,
  signOut,
  GoogleAuthProvider,
  TwitterAuthProvider,
  signInWithPopup,
} from 'firebase/auth'
import { auth, db } from '../firebase/config'
import { useNavigate } from 'react-router-dom'
import { setPersistence, browserLocalPersistence } from 'firebase/auth'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate()

  const [user, setUser] = useState(null)

  useEffect(() => {
    const initializeAuth = async () => {
      await setPersistence(auth, browserLocalPersistence)

      const unsubscribe = onAuthStateChanged(auth, async (user) => {
        if (user) {
          const userRef = doc(db, 'users', user.uid)
          const docSnap = await getDoc(userRef)
          setUser({ ...user, ...docSnap.data() })
          console.log(user)
          // Fetch and set user data
        } else {
          setUser(null)
        }
      })

      return () => unsubscribe()
    }

    initializeAuth()
  }, [])

  const handleLogout = async () => {
    try {
      await signOut(auth)
    } catch (error) {
      console.error('Error logging out:', error)
    }
  }

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider()
    try {
      const result = await signInWithPopup(auth, provider)
      return result
    } catch (error) {
      console.error('Error signing in with Google:', error)
    }
  }

  const handleLogin = () => {
    const provider = new TwitterAuthProvider()

    signInWithPopup(auth, provider)
      .then((result) => {
        if (result.user) {
          const credential = TwitterAuthProvider.credentialFromResult(result)

          if (credential) {
            const userData = {
              uid: result.user.uid,
              displayName: result.user.displayName,
              lastSignInTime: result.user.metadata.lastSignInTime,
              accessToken: credential.accessToken,
              secret: credential.secret,
            }

            // Here, you set user data in your state and possibly Firestore
            setUser({ ...userData }) // Set user state locally

            // Save to Firestore
            const userRef = doc(db, 'users', userData.uid)
            setDoc(userRef, userData, { merge: true })
              .then(() => {
                console.log('User data saved to Firestore!')
                navigate('/dashboard')
              })
              .catch((error) => {
                console.error('Error saving user data to Firestore:', error)
              })
          } else {
            console.error('No credential found from the Twitter Auth result')
          }
        } else {
          console.error('No user found in the Twitter Auth result')
        }
      })
      .catch((error) => {
        console.error('Error with Twitter login:', error)
        if (error.code && error.message) {
          console.error(
            `Firebase error code: ${error.code}, message: ${error.message}`
          )
        }
      })
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        auth,
        handleLogout,
        handleLogin,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  return useContext(AuthContext)
}
