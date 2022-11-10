import { ReactElement, useContext, useEffect } from 'react'
import { NextPageWithLayout } from '../../_app'
import DefaultLayout from '../../../layouts/DefaultLayout'
import { Article } from 'phosphor-react'
import { GetServerSideProps } from 'next'
import { api } from '../../../libs/backend'
import { getCookie } from 'cookies-next'
import { Loading } from '../../../components/Loading'
import clsx from 'clsx'
import Link from 'next/link'
import { AuthContext } from '../../../contexts/AuthContext'
import { useRouter } from 'next/router'

interface Consumption {
  id: number
  tag: string
  date: string
  consumption: number
  value: number
  discount: number
  createdAt: string
  updatedAt: string
  userId: number
}

interface ListProps {
  currentPage: number
	consumptions?: {
    pages: number[]
		count: number
		rows: Consumption[]
	}
}

const List: NextPageWithLayout<ListProps> = ({consumptions, currentPage}) => {
  const {name} = useContext(AuthContext);
  const { push } = useRouter()

  useEffect(() => {
    if(!name) {
      push('/')
    }
  }, [name])

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
            {
              consumptions && (
                consumptions.rows?.map(consumption => (
                  <tr className='h-16 hover:bg-dark-blue-400 hover:text-gray-100' key={consumption.id}>
                    <td className='border-t border-collapse border-dark-blue-400 pl-2 before:content-["#"]'> {consumption.id}</td>
                    <td className='border-t border-collapse border-dark-blue-400'>{consumption.tag}</td>
                    <td className='border-t border-collapse border-dark-blue-400'>{consumption.date}</td>
                    <td className='border-t border-collapse border-dark-blue-400'>{consumption.consumption} kW</td>
                    <td className='border-t border-collapse border-dark-blue-400'>{consumption.value}</td>
                    <td className='border-t border-collapse border-dark-blue-400'>{consumption.discount}</td>
                  </tr>
                ))
              )
            }
          </tbody>
          
        </table>
        {
          !consumptions && <Loading />
        }
      </div>

      <div className='mt-4 flex justify-center'>
        <div className='flex gap-4'>
          <Link
            prefetch={false}
            className={clsx('bg-green-500 text-gray-100 font-bold py-2 px-4 rounded', {
              'cursor-not-allowed opacity-70 pointer-events-none': currentPage <= 1,
              'hover:bg-green-400': currentPage > 1
            })}
            href={`/consumption/list/${Number(currentPage) - 1}`}
          >
            Anterior
          </Link>
          {
            consumptions && (
              consumptions.pages.map(page => (
                <Link
                  prefetch={false}
                  href={`/consumption/list/${page}`}
                  className={clsx('text-gray-100 font-bold py-2 px-4 rounded', {
                    'bg-green-500 hover:bg-green-400': page === Number(currentPage),
                    'bg-cyan-600 hover:bg-green-400': page !== Number(currentPage)
                  })} 
                  key={page}
                >
                  {page}
                </Link>
              ))
            )
          }
          <Link
            prefetch={false}
            href={`/consumption/list/${Number(currentPage) + 1}`}
            className={clsx('bg-green-500 text-gray-100 font-bold py-2 px-4 rounded', {
              'cursor-not-allowed opacity-70 pointer-events-none': consumptions !== undefined && currentPage >= consumptions.pages[consumptions.pages.length - 1],
              'hover:bg-green-400': consumptions !== undefined && currentPage < consumptions.pages[consumptions.pages.length - 1]
            })}
          >
            Próximo
          </Link>
        </div>
        
      </div>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async ({params, req, res}) => {
  const token = getCookie('token', {req, res})

  if(!token) return {
    redirect: {
      destination: '/logout',
      permanent: false,
    }
  }

  const page = params?.page

  const consumptions = await api.get(`/consumptions?page=${page}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })

  const pages = consumptions.data.pages.filter((x: number) => x <= Number(page)+2 && x >=Number(page)-2)

  const consumptionsNew = {
    pages,
		count: consumptions.data.count,
		rows: consumptions.data.rows
	}

  return {
    props: {
      currentPage: page,
      consumptions: consumptionsNew
    }
  }
}

List.getLayout = function getLayout(page: ReactElement) {
  return (
    <DefaultLayout>
      {page}
    </DefaultLayout>
  )
}

export default List