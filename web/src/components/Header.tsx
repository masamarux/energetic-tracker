import { Alfa_Slab_One } from '@next/font/google';

const alfaSlabOne = Alfa_Slab_One({
  weight: ['400']
})

export function Header() {
  return (
    <header className="bg-dark-blue-500 py-4 w-full">
      <div className='mx-auto w-[1120px] flex justify-between items-center flex-row px-4'>
        <h1 className={`flex justify-center items-center ${alfaSlabOne.className} gap-4`}>
          <span className='text-xl text-transparent bg-clip-text bg-gradient-to-l from-cyan-700 to-green-500'>
            ENERGETIC
          </span>
          <span className='text-2md text-dark-blue-100'>
            TRACKER
          </span>
        </h1>

        <span className='text-sm text-dark-blue-100'>
          Boa noite, Marcelo
        </span>
      </div>
    </header>
  )
}