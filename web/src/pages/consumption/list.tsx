import { ReactElement } from 'react'
import { NextPageWithLayout } from './../_app'
import DefaultLayout from '../../layouts/DefaultLayout'
import { Article } from 'phosphor-react'

const List: NextPageWithLayout = () => {
  return (
    <div>
      <strong className='flex flex-row items-center gap-4 text-lg font-bold text-gray-100 mb-4'><Article weight='bold' className='text-green-500' /> Lista de consumo:</strong>

      <div className='bg-dark-blue-500 rounded p-4 border border-collapse border-dark-blue-300'>
        <table className='table-auto w-full border-spacing-8 text-gray-200'>
          <thead className='text-left'>
            <tr className='h-10 text-gray-100'>
              <th className='pl-4'>id</th>
              <th className=''>Tag</th>
              <th className=''>Data</th>
              <th className=''>Consumo</th>
              <th className=''>Valor</th>
              <th className=''>Desconto</th>
            </tr>
          </thead>
          <tbody>
            <tr className='h-16 hover:bg-dark-blue-400 hover:text-gray-100'>
              <td className='border-t border-collapse border-dark-blue-400 pl-2 before:content-["#"]'> 1</td>
              <td className='border-t border-collapse border-dark-blue-400'>Tag 1</td>
              <td className='border-t border-collapse border-dark-blue-400'>01/01/2021</td>
              <td className='border-t border-collapse border-dark-blue-400'>100 kW</td>
              <td className='border-t border-collapse border-dark-blue-400'>R$ 100,00</td>
              <td className='border-t border-collapse border-dark-blue-400'>R$ 10,00</td>
            </tr>
            <tr className='h-16 hover:bg-dark-blue-400 hover:text-gray-100'>
              <td className='border-t border-collapse border-dark-blue-400 pl-2 before:content-["#"]'> 1</td>
              <td className='border-t border-collapse border-dark-blue-400'>Tag 1</td>
              <td className='border-t border-collapse border-dark-blue-400'>01/01/2021</td>
              <td className='border-t border-collapse border-dark-blue-400'>100 kW</td>
              <td className='border-t border-collapse border-dark-blue-400'>R$ 100,00</td>
              <td className='border-t border-collapse border-dark-blue-400'>R$ 10,00</td>
            </tr>
            <tr className='h-16 hover:bg-dark-blue-400 hover:text-gray-100'>
              <td className='border-t border-collapse border-dark-blue-400 pl-2 before:content-["#"]'> 1</td>
              <td className='border-t border-collapse border-dark-blue-400'>Tag 1</td>
              <td className='border-t border-collapse border-dark-blue-400'>01/01/2021</td>
              <td className='border-t border-collapse border-dark-blue-400'>100 kW</td>
              <td className='border-t border-collapse border-dark-blue-400'>R$ 100,00</td>
              <td className='border-t border-collapse border-dark-blue-400'>R$ 10,00</td>
            </tr>
            <tr className='h-16 hover:bg-dark-blue-400 hover:text-gray-100'>
              <td className='border-t border-collapse border-dark-blue-400 pl-2 before:content-["#"]'> 1</td>
              <td className='border-t border-collapse border-dark-blue-400'>Tag 1</td>
              <td className='border-t border-collapse border-dark-blue-400'>01/01/2021</td>
              <td className='border-t border-collapse border-dark-blue-400'>100 kW</td>
              <td className='border-t border-collapse border-dark-blue-400'>R$ 100,00</td>
              <td className='border-t border-collapse border-dark-blue-400'>R$ 10,00</td>
            </tr>
          </tbody>
        </table>
      </div>
      
    </div>
  )
}

List.getLayout = function getLayout(page: ReactElement) {
  return (
    <DefaultLayout>
      {page}
    </DefaultLayout>
  )
}

export default List