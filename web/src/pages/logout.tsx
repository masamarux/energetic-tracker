
import axios from 'axios'
import { setCookie } from 'cookies-next'
import { GetServerSideProps } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useContext, useEffect } from 'react'
import { Loading } from '../components/Loading'

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
      <Head>
        <title>Saindo do app... | Energetic Tracker</title>
        <meta name="robots" content="noindex"/>
      </Head>

      <div className='flex items-center justify-center h-screen w-screen '>
        <Loading />
      </div>
    </>
    
  )
}
