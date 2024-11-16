import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import queryString from 'query-string'
import axios from 'axios'

const API_URL = process.env.REACT_APP_API_URL // Adjust this to your API server URL

const TwitterCallbackPage = () => {
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    const params = queryString.parse(location.search)
    const { oauth_token, oauth_verifier } = params
    console.log(params)

    if (!oauth_token || !oauth_verifier) {
      console.error('OAuth token or verifier is missing')
      return
    }

    completeTwitterAuth(oauth_token, oauth_verifier)
  }, [location, navigate])

  async function completeTwitterAuth(oauthToken, oauthVerifier) {
    try {
      // Send these to your backend to exchange them for the access token
      console.log(oauthToken)
      console.log(oauthVerifier)
      const response = await axios.post(`${API_URL}/twitter/access-token`, {
        oauth_token: oauthToken,
        oauth_verifier: oauthVerifier,
      })

      if (response.data) {
        console.log('Successfully authenticated', response.data)
        sessionStorage.setItem('oauth_token', response.data.oauth_token)
        sessionStorage.setItem(
          'oauth_token_secret',
          response.data.oauth_token_secret
        )

        // Redirect the user to the dashboard or another page after successful authentication
        navigate('/dashboard')
      }
    } catch (error) {
      console.error('Failed to complete Twitter authentication:', error)
      navigate('/error')
    }
  }

  return <div>Loading...</div>
}

export default TwitterCallbackPage
