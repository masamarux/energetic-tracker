import { Alfa_Slab_One } from '@next/font/google';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { Button } from './Button';

const alfaSlabOne = Alfa_Slab_One({
  weight: ['400']
})

export function Header() {
  const { name } = useContext(AuthContext)
  const { push } = useRouter()
  const today = new Date()
  const now = today.getHours()
  const greetings = now >= 6 && now < 12 ? 'Bom dia' : now >= 12 && now < 18 ? 'Boa tarde' : 'Boa noite';

  function handleLogout() {
    push('/logout')
  }

  return (
    <header className="bg-dark-blue-500 py-4 w-full">
      <div className='mx-auto md:w-[1120px] w-full flex justify-between items-center flex-row px-4'>
        <h1 className={`flex justify-center items-center ${alfaSlabOne.className} gap-4`}>
          <span className='text-xl text-transparent bg-clip-text bg-gradient-to-l from-cyan-700 to-green-500'>
            ENERGETIC
          </span>
          <span className='text-2md text-dark-blue-100'>
            TRACKER
          </span>
        </h1>
        <div className='flex justify-center items-center gap-4'>
          <span className='text-sm text-dark-blue-100 inline-block whitespace-nowrap'>
            {greetings}, {name}
          </span>
            <Button variant='tertiary' onClick={handleLogout}>
              Sair
            </Button>
        </div>
      </div>
    </header>
  )
}