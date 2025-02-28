import { useState } from 'react'
import { useAuthContext } from './useAuthContext'

export const useLogin = () => {
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(null)
  const { dispatch } = useAuthContext()

  const login = async (email, password, authLevel) => {
    setIsLoading(true)
    setError(null)

    const response = await fetch('/api/user/login', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ email, password, authLevel })
    })
    const json = await response.json()

    if (!response.ok) {
      setIsLoading(false)
      setError(json.error)
    }
    if (response.ok) {
      // Save user data & token separately in localStorage
      localStorage.setItem('user', JSON.stringify(json));
      localStorage.setItem('token', json.token);  // Store token separately
    
      // Update the auth context
      dispatch({ type: 'LOGIN', payload: json });
    
      setIsLoading(false);
    }
    
  }
  
  return { login, isLoading, error }
}
