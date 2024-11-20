import { firebaseConfig } from '../firebase/config'

// Получение данных пользователя из localStorage
export const getAuthUserFromLocalStorage = () => {
  const keyPrefix = `firebase:authUser:${firebaseConfig.apiKey}`
  const keys = Object.keys(localStorage).filter((key) =>
    key.startsWith(keyPrefix)
  )

  if (keys.length > 0) {
    const authData = localStorage.getItem(keys[0])
    if (authData) {
      return JSON.parse(authData)
    }
  }

  return null
}

// Установка статуса подписки в localStorage
export const setSubscriptionStatusInLocalStorage = (status) => {
  const key = `firebase:hassubscription:${firebaseConfig.apiKey}`
  localStorage.setItem(key, JSON.stringify(status))
}

// Получение статуса подписки из localStorage
export const getSubscriptionStatusFromLocalStorage = () => {
  const key = `firebase:hassubscription:${firebaseConfig.apiKey}`
  const subscriptionData = localStorage.getItem(key)

  return subscriptionData ? JSON.parse(subscriptionData) : null
}

export const getUserWithSubscriptionFromLocalStorage = () => {
  const user = getAuthUserFromLocalStorage()
  const hasSubscription = getSubscriptionStatusFromLocalStorage()

  if (user) {
    return {
      ...user,
      hasSubscription: hasSubscription || false, // Default to `false` if no subscription status is found
    }
  }

  return null // Return `null` if no user is found
}
