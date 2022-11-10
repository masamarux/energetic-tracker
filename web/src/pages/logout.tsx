
import axios from 'axios'
import { useRouter } from 'next/router'
import { useContext, useEffect } from 'react'

import { AuthContext } from '../contexts/AuthContext'

export default function Logout() {
  const { logout } = useContext(AuthContext)
  const { push } = useRouter()

  async function handleLogout() {
    try{
      logout()
      
      await axios.get('/api/logout')
    } catch(err) {
      console.log(err)
    } finally {
      push('/')
    }
  }

  useEffect(() => {
    handleLogout()
  }, [])

  return(
    <>
    </>
  )
}