// userSlice.js
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  user: null, // Stores user information
  loading: false, // Indicates whether user data is being fetched
  error: null, // Stores error messages, if any
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload // Set the user data
    },
    clearUser(state) {
      state.user = null // Clear user data on logout
    },
    setLoading(state, action) {
      state.loading = action.payload // Set loading state
    },
    setError(state, action) {
      state.error = action.payload // Set error messages
    },
  },
})

export const { setUser, clearUser, setLoading, setError } = userSlice.actions
export default userSlice.reducer
