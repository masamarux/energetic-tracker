import { ReactElement, useContext, useEffect } from 'react'
import { NextPageWithLayout } from './_app'
import DefaultLayout from '../layouts/DefaultLayout'
import { StatusItem } from '../components/StatusItem'
import { HouseLine } from 'phosphor-react'
import * as Separator from '@radix-ui/react-separator'
import { Button } from '../components/Button'
import { useRouter } from 'next/router'
import { ApexOptions } from 'apexcharts'
import dynamic from 'next/dynamic'
import { EnergyItem } from '../components/EnergyItem'
import { AuthContext } from '../contexts/AuthContext'
import { GetServerSideProps } from 'next'
import { getCookie, setCookie } from 'cookies-next'
import { api } from '../libs/backend'
import { getMonthName } from '../utils/getMonthName'
import { Loading } from '../components/Loading'
import { priceFormatter } from '../utils/formatter'
import Head from 'next/head'
import {isEmpty} from 'lodash'
import Link from 'next/link'

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false })

interface MonthDetails {
  month: number
  totalConsumption: number
  totalValue: number
  totalDiscount: number
}


interface ValueAndEconomyChart {
	months: number[]
	values: number[]
	discounts: number[]
}

interface ExtraEnergyData {
	energyPerHour: number
	valuePerHour: number
	valueTotal: number
	economyTotal: number
}

interface OverviewProps {
  monthDetails: MonthDetails
  extraEnergyData: ExtraEnergyData
  valueAndEconomyChartData: ValueAndEconomyChart
}

const Overview: NextPageWithLayout<OverviewProps> = ({monthDetails, extraEnergyData, valueAndEconomyChartData}) => {
  const { push } = useRouter()
  const options: ApexOptions = {
    chart: {
      type: 'line',
      animations: {easing: 'easeinout', speed: 800, animateGradually: {enabled: true, delay: 150}},
      zoom: {
        enabled: false,
      },
      toolbar: {
        show: false,
      }
    },
    stroke: {
      curve: 'smooth',
      colors: ['#005A6C', '#69B14C'],
    },
    title: {
      text: 'Gasto x Economia',
      align: 'left',
      style: {
        fontSize: '18px',
        color: '#e2e3e4',
      },
    },
    xaxis: {
      categories: isEmpty(valueAndEconomyChartData) ? [] : valueAndEconomyChartData.months.map(month => getMonthName(month - 1)) ,
      labels: {
        style: {
          colors: '#e2e3e4',
        },
      }
    },
    yaxis: {
      labels: {
        style: {
          colors: '#e2e3e4',
        },
      }
    },
    legend: {
      labels: {
        colors: '#e2e3e4',
      }
    },
    
  }

  const series =  [
    {
      name: "Gasto",
      data: isEmpty(valueAndEconomyChartData) ? [] : valueAndEconomyChartData.values,
      color: '#005A6C'
    },
    {
      name: "Economia",
      data: isEmpty(valueAndEconomyChartData) ? [] : valueAndEconomyChartData.discounts,
      color: '#69B14C'
    }
  ]

  if(!monthDetails || !extraEnergyData || !valueAndEconomyChartData) {
    return (
      <Loading />
    )
  }

  return (
    <>
      <Head>
        <title>Visão geral | Energetic Tracker</title>
        <meta name="robots" content="noindex"/>
      </Head>

      <div>
        <strong className='flex flex-row items-center gap-4 text-lg font-bold text-gray-100 mb-4'><HouseLine weight='bold' className='text-green-500' /> Visão geral do seu consumo:</strong>

        <div className='grid md:grid-cols-7-3 gap-4 grid-cols-1'>
          <div className='rounded bg-dark-blue-500 p-px h-fit'>
            <div className='p-4 text-2md font-bold text-gray-200'>Detalhes do mês</div>
            <div className='flex flex-row items-center justify-center bg-dark-blue-700 rounded-b p-4'>
              <StatusItem title="Mês" value={isEmpty(monthDetails) ? '--' : getMonthName(monthDetails.month -1)} />
              <Separator.Root orientation='vertical' decorative className='bg-dark-blue-500 w-px h-8 mx-4' />
            
              <StatusItem title="Consumo" value={`${monthDetails.totalConsumption || '0'} kW`} />
              <Separator.Root orientation='vertical' decorative className='bg-dark-blue-500 w-px h-8 mx-4' />

              <StatusItem title="Gasto" value={isEmpty(monthDetails) ? '0' : priceFormatter.format(monthDetails.totalValue)} />
              <Separator.Root orientation='vertical' decorative className='bg-dark-blue-500 w-px h-8 mx-4' />

              <StatusItem title="Economia" value={isEmpty(monthDetails) ? '0' : priceFormatter.format(monthDetails.totalDiscount)} />
            </div>
          </div>

          <div className='flex flex-col gap-4 '>
            <Button onClick={() => push('/consumption/add')}>ADICIONAR NOVO CONSUMO</Button>
            <Button variant='secondary' onClick={() => push('/consumption/list/1')}>VISUALIZAR CONSUMOS</Button>
          </div>
        </div>

        <div className='mt-4 grid grid-cols-4 gap-2'>
          <EnergyItem title='Energia gasta por hora' value={`${isEmpty(extraEnergyData) ? '0' : extraEnergyData.energyPerHour.toFixed(2)} kW/h`} />
          <EnergyItem title='Valor gasto por hora' value={isEmpty(extraEnergyData) ? '0' : priceFormatter.format(extraEnergyData.valuePerHour)} variant='secondary' />
          <EnergyItem title='Gastos totais' value={isEmpty(extraEnergyData) ? '0' : priceFormatter.format(extraEnergyData.valueTotal)} />
          <EnergyItem title='Economia total' value={isEmpty(extraEnergyData) ? '0' : priceFormatter.format(extraEnergyData.economyTotal)} variant='secondary'  />
        </div>

        <div className='mt-4 bg-dark-blue-500 p-4 rounded'>
          {
            isEmpty(valueAndEconomyChartData) ? (
              <div className='flex items-center justify-center text-2md text-gray-100 flex-col'>
                <span>Sem dados para mostrar no gráfico</span>
                <span>
                  Adicione novos consumos <Link href='/consumption/add' className='text-green-500 underline hover:text-green-700'>clicando aqui</Link> para começar a visualizar
                </span>
                
              </div>
            ) : (
              <Chart options={options} series={series} type="line" width='100%' height={400} /> 
            )
          }
        </div>
      </div>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({req, res}) => {
  try {
    const token = getCookie('token', {req, res})
  
    const [monthDetails, extraEnergyData, valueAndEconomyChartData] = await Promise.all([
      api.get('/consumptions/month-details', {headers: {authorization: `Bearer ${token}`}}),
      api.get('/consumptions/more-energy-data', {headers: {authorization: `Bearer ${token}`}}),
      api.get('/consumptions/value-and-economy-chart', {headers: {authorization: `Bearer ${token}`}}),
    ])

    console.log(monthDetails.data)
  
    return {
      props: {
        ...monthDetails.data,
        extraEnergyData: extraEnergyData.data,
        valueAndEconomyChartData: valueAndEconomyChartData.data,
      }
    }
  } catch(err: any) {
    if(err.response.status === 401) {
      return {
        redirect: {
          destination: '/logout',
          permanent: false,
        }
      }
    }
    return {
      props: {}
    }
  }
}

Overview.getLayout = function getLayout(page: ReactElement) {
  return (
    <DefaultLayout>
      {page}
    </DefaultLayout>
  )
}

export default Overview