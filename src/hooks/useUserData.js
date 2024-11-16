import { useState, useEffect } from 'react'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '../firebase/config' // Adjust the path as necessary

const useUserData = (uid) => {
  const [userData, setUserData] = useState(null)

  useEffect(() => {
    const fetchUserData = async () => {
      console.log(uid)
      if (uid) {
        try {
          const docRef = doc(db, 'users', uid)
          const docSnap = await getDoc(docRef)
          if (docSnap.exists()) {
            console.log(docSnap.data())
            setUserData(docSnap.data())
          } else {
            // not found
            setUserData(null)
          }
        } catch (error) {
          console.error('Error fetching user data:', error)
        }
      }
    }

    fetchUserData()
  }, [uid])

  return userData
}

export default useUserData
