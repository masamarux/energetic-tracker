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
      <div className='mx-auto w-[1120px] px-4 grid grid-cols-3-7 gap-4 mt-4'>
        <AsideMenu />
        <main>{children}</main>
      </div>
    </div>
  )
}