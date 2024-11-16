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
  setPersistence(auth, browserLocalPersistence)

  const [user, setUser] = useState(null)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      console.log(user)
      if (user) {
        const uid = user.uid
        // Fetch additional user info from Firestore
        const userRef = doc(db, 'users', user.uid)
        const userDoc = await getDoc(userRef)
        if (userDoc.exists()) {
          const userData = userDoc.data()
          console.log(userData)
          setUser({ ...user, ...userData })
        } else {
          console.log(user)
          setUser(user)
        }
      } else {
        console.log('set user to null')
        setUser(null)
      }
    })
    return () => {
      console.log('set user to unsubscribe')
      unsubscribe()
    }
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

  const handleLogin = async () => {
    try {
      const provider = new TwitterAuthProvider()

      // Properly await the signInWithPopup without chaining .then()
      const result = await signInWithPopup(auth, provider)
      console.log(result)

      // Make sure user and credential are defined before using them
      if (result.user) {
        setUser(result.user)
        const credential = TwitterAuthProvider.credentialFromResult(result)

        if (credential) {
          const userData = {
            uid: result.user.uid,
            displayName: result.user.displayName,
            lastSignInTime: result.user.metadata.lastSignInTime,
            accessToken: credential.accessToken,
            secret: credential.secret,
          }

          // Where user data is saved in Firestore
          const userRef = doc(db, 'users', userData.uid)
          await setDoc(userRef, userData, { merge: true })
          console.log('User data saved to Firestore!')

          // Assuming navigate is a function you import or define that handles navigation.
          navigate('/dashboard')
        } else {
          console.error('No credential found from the Twitter Auth result')
        }
      } else {
        console.error('No user found in the Twitter Auth result')
      }
    } catch (error) {
      // Improved error handling
      console.error('Error with Twitter login or Firestore operation:', error)
      if (error.code) {
        console.error('Firebase error code:', error.code)
      }
      if (error.message) {
        console.error('Firebase error message:', error.message)
      }
    }
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
