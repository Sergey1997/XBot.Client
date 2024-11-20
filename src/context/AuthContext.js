import React, { createContext, useEffect, useContext } from 'react'
import {
  signOut,
  onAuthStateChanged,
  signInWithPopup,
  GoogleAuthProvider,
  TwitterAuthProvider,
} from 'firebase/auth'
import { useDispatch, useSelector } from 'react-redux'
import {
  setUser,
  clearUser,
  setLoading,
  setError,
} from '../redux/slicers/userSlice'
import { auth, db } from '../firebase/config'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { getPremiumStatus } from '../services/account/getPremiumStatus'
import {
  getAuthUserFromLocalStorage,
  getSubscriptionStatusFromLocalStorage,
  setSubscriptionStatusInLocalStorage,
} from '../utils/localStorage'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setLoading(true))

    const fetchFromLocalStorage = async () => {
      const localUser = getAuthUserFromLocalStorage()
      const hasSubscription = getSubscriptionStatusFromLocalStorage()

      if (localUser) {
        console.log('Loaded user from localStorage:', {
          ...localUser,
          hasSubscription,
        })
        dispatch(setUser(...localUser, hasSubscription))
      } else {
        console.log('No user found in localStorage.')
        dispatch(clearUser())
      }
    }

    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        try {
          const userRef = doc(db, 'customers', currentUser.uid)
          const docSnap = await getDoc(userRef)
          const firestoreData = docSnap.exists() ? docSnap.data() : {}

          const hasSubscription = await getPremiumStatus()
          setSubscriptionStatusInLocalStorage(hasSubscription)

          console.log('User loaded from Firebase:', {
            ...currentUser,
            ...firestoreData,
            hasSubscription,
          })
          dispatch(setUser(...currentUser, ...firestoreData, hasSubscription))
        } catch (error) {
          dispatch(setError(error.message))
        }
      } else {
        await fetchFromLocalStorage()
      }
      dispatch(setLoading(false))
    })

    return () => unsubscribe()
  }, [dispatch])

  const handleLogin = () => {
    const provider = new TwitterAuthProvider()

    signInWithPopup(auth, provider)
      .then(async (result) => {
        if (result.user) {
          const credential = TwitterAuthProvider.credentialFromResult(result)

          if (credential) {
            const userData = {
              uid: result.user.uid,
              displayName: result.user.displayName,
              lastSignInTime: result.user.metadata.lastSignInTime,
              photoURL: result.user.photoURL,
              accessToken: credential.accessToken,
              secret: credential.secret,
              hasSubscription: await getPremiumStatus(),
            }

            // Here, you set user data in your state and possibly Firestore
            dispatch(setUser({ ...userData })) // Set user state locally

            // Save to Firestore
            const userRef = doc(db, 'customers', userData.uid)
            setDoc(userRef, userData, { merge: true })
              .then(() => {
                console.log('User data saved to Firestore!')
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

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider()
    try {
      await signInWithPopup(auth, provider)
    } catch (error) {
      dispatch(setError(error.message))
    }
  }

  const handleLogout = async () => {
    try {
      await signOut(auth)
      dispatch(clearUser())
      localStorage.removeItem(
        `firebase:hassubscription:${process.env.REACT_APP_FIREBASE_API_KEY}`
      )
    } catch (error) {
      dispatch(setError(error.message))
    }
  }

  return (
    <AuthContext.Provider
      value={{ handleLogin, handleLogout, handleGoogleSignIn }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
