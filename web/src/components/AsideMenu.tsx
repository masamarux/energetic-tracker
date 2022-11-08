import { HouseLine, Article, Plus } from 'phosphor-react'
import * as Separator from '@radix-ui/react-separator'
import { MenuItem } from './MenuItem'

export function AsideMenu() {
  return(
    <aside className='bg-dark-blue-700 rounded-md border-2 border-dark-blue-500 p-4 h-fit'>
      <nav>
        <ul>
          <MenuItem href="/overview">
            <HouseLine size={18} className="text-gray-100" weight='bold' /> Visão geral
          </MenuItem>
          <Separator.Root orientation='horizontal' decorative className='bg-dark-blue-500 w-full h-px my-4' />
          <MenuItem href="/consumption/add">
            <Plus size={18} className="text-gray-100" weight='bold'  /> Adicionar consumo
          </MenuItem>
          <Separator.Root orientation='horizontal' decorative className='bg-dark-blue-500 w-full h-px my-4' />
          <MenuItem href="/consumption/list">
            <Article size={18} className="text-gray-100" weight='bold'  /> Listagem de consumos
          </MenuItem>
        </ul>
      </nav>
    </aside>
  )
}