import { ReactNode } from 'react'
import { Header } from '../components/Header'
import { AsideMenu } from '../components/AsideMenu'

interface DefaultLayoutProps {
  children: ReactNode
}

export default function DefaultLayout({ children }: DefaultLayoutProps) {
  return (
    <div>
      <Header />
      <div className='mx-auto md:w-[1120px] w-screen px-4 grid md:grid-cols-3-7 grid-1 gap-4 mt-4'>
        <AsideMenu />
        <main>{children}</main>
      </div>
    </div>
  )
}