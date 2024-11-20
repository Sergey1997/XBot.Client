import { auth } from './config'
import { setPersistence, browserLocalPersistence } from 'firebase/auth'

// Установка персистенции сессии
export const configureAuthPersistence = async () => {
  try {
    await setPersistence(auth, browserLocalPersistence)
    console.log('Session persistence set to local storage.')
  } catch (error) {
    console.error('Error setting persistence:', error)
  }
}

// Перезагрузка текущего пользователя
export const reloadCurrentUser = async () => {
  if (auth.currentUser) {
    try {
      await auth.currentUser.reload()
      console.log('Current user reloaded:', auth.currentUser)
    } catch (error) {
      console.error('Error reloading user:', error)
    }
  } else {
    console.warn('No current user to reload.')
  }
}
