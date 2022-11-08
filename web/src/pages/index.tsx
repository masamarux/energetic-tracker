import { Alfa_Slab_One } from '@next/font/google';
import { useRouter } from 'next/router';
import { useContext, useEffect } from 'react';
import { useForm,  } from 'react-hook-form';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { AuthContext } from '../contexts/AuthContext';
import * as Separator from '@radix-ui/react-separator'

const alfaSlabOne = Alfa_Slab_One({
  weight: ['400']
})

interface LoginInputProps {
  email: string
  password: string
}

export default function Home() {
  const {name} = useContext(AuthContext);
  const {push} = useRouter()
  const { register, handleSubmit } = useForm<LoginInputProps>()

  function redirectUserToOverview() {
    if(name) {
      push('/overview')
    }
  }

  function handleNavigationToSignUp() {
    push('/signup')
  }

  function handleLogin(data: LoginInputProps) {
    console.log(data)
  }

  useEffect(() => {
    redirectUserToOverview();
  }, [])

  return (
    <div className='bg-gradient-to-r from-cyan-700 to-green-500 flex flex-1 justify-center items-center w-screen h-screen'>
      <div className='bg-dark-blue-700 rounded-lg shadow-sm p-8'>
        <header>
          <h1 className={`flex justify-center items-center ${alfaSlabOne.className} gap-4`}>
            <span className='text-3xl text-transparent bg-clip-text bg-gradient-to-l from-cyan-700 to-green-500'>
              ENERGETIC
            </span>
            <span className='text-xl text-dark-blue-100'>
              TRACKER
            </span>
          </h1>
        </header>

        <Separator.Root orientation='horizontal' decorative className='bg-dark-blue-500 w-full h-px mb-4' />

        <form onSubmit={handleSubmit(handleLogin)} className="flex flex-col gap-4">
          <label className='grid grid-cols-3-7 items-center gap-4 text-gray-100 text-lg font-bold'>Email
            <Input
              type="email"
              placeholder='Seu email aqui'
              {...register('email')}
            />
          </label>

          <label className='grid grid-cols-3-7 items-center gap-4 text-gray-100 text-lg font-bold'>Senha
            <Input
              type="password"
              placeholder='******'
              {...register('password')}
            />
          </label>
          
          <footer className='flex justify-around gap-8'>
            <Button type="submit">
              Entrar
            </Button>
            <Button type="button" variant='secondary' onClick={handleNavigationToSignUp}>
              Cadastrar
            </Button>
          </footer>
        </form>
      </div>
    </div>
  )
}
