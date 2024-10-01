import { defineStore } from 'pinia'
import Cookies from 'js-cookie'
import axios from 'axios'
import { ref } from 'vue'

interface UserInfo {
  name: string
  email: string
}

const useAuthStore = defineStore('authStore', () => {
  const isProduction = import.meta.env.NODE_ENV === 'production'

  const user_info = ref<UserInfo | null>(null)

  const setCookie = (key: string, value: string) => {
    Cookies.set(key, value, { expires: 1, sameSite: 'Lax', secure: isProduction })
  }

  const removeCookie = (key: string) => {
    Cookies.remove(key)
  }

  const getCookie = (key: string) => {
    return Cookies.get(key)
  }

  const setAuthentication = (token: string) => {
    setCookie('token', token)
  }

  const logOut = async () => {
    try {
      // Get the token from cookies
      const token = getCookie('token')

      if (token) {
        // Make the logout request to the backend with the token in the headers
        await axios.post(
          'http://localhost:5000/api/logout',
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        )
      }

      // Remove the token from cookies and clear user info on the frontend
      removeCookie('token')
      user_info.value = null

      location.reload()
    } catch (error) {
      console.error('Error during logout:', error)
      // Handle errors as needed
    }
  }

  const isLogin = async () => {
    const token = getCookie('token')

    if (token) {
      try {
        const res = await axios.post('http://localhost:5000/api/auth', {
          token
        })
        user_info.value = res.data.data as UserInfo
        return true // User is authenticated
      } catch (error) {
        logOut() // Log out if there's an error (e.g., token is invalid)
        return false
      }
    }

    return false // No token, user is not authenticated
  }


  const findAccount = async (email: string) => {
    try {
      const res = await axios.post('http://localhost:5000/api/findaccount', { email });
      
      // Check if the response status is 200
      if (res.status === 200) {
        return true; 
      }
      
      return false;  // Account not found
    } catch (err) {
      return false;  // Return false on error as well
    }
  }

  return {
    findAccount,
    user_info,
    setAuthentication,
    logOut,
    isLogin
  }
})

export default useAuthStore
