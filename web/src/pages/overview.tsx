import { ReactElement } from 'react'
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
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false })

const Overview: NextPageWithLayout = () => {
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
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
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
      data: [28, 29, 33, 36, 32, 32, 33],
      color: '#005A6C'
    },
    {
      name: "Economia",
      data: [12, 11, 14, 18, 17, 13, 13],
      color: '#69B14C'
    }
  ]

  return (
    <div>
      <strong className='flex flex-row items-center gap-4 text-lg font-bold text-gray-100 mb-4'><HouseLine weight='bold' className='text-green-500' /> Visão geral do seu consumo:</strong>

      <div className='grid grid-cols-7-3 gap-4'>
        <div className='rounded bg-dark-blue-500 p-px h-fit'>
          <div className='p-4 text-2md font-bold text-gray-200'>Status do mês</div>
          <div className='flex flex-row items-center justify-center bg-dark-blue-700 rounded-b p-4'>

            <StatusItem title="Mês" value="Novembro/2022" />
            <Separator.Root orientation='vertical' decorative className='bg-dark-blue-500 w-px h-8 mx-4' />
            <StatusItem title="Consumo" value="600 kW" />
            <Separator.Root orientation='vertical' decorative className='bg-dark-blue-500 w-px h-8 mx-4' />
            <StatusItem title="Gasto" value="R$ 700,00" />
            <Separator.Root orientation='vertical' decorative className='bg-dark-blue-500 w-px h-8 mx-4' />
            <StatusItem title="Economia" value="R$ 200,00" />

          </div>
        </div>

        <div className='flex flex-col gap-4'>
          <Button onClick={() => push('/consumption/add')}>ADICIONAR NOVO CONSUMO</Button>
          <Button variant='secondary' onClick={() => push('/consumption/list')}>VISUALIZAR CONSUMOS</Button>
        </div>
      </div>

      <div className='mt-4 grid grid-cols-4 gap-2'>
        <EnergyItem title='Energia gasta por hora' value='12kw/h' />
        <EnergyItem title='Valor gasto por hora' value='R$ 6,00' variant='secondary' />
        <EnergyItem title='Possível gasto até o fim do mês' value='R$ 720,00' />
        <EnergyItem title='Economia total' value='R$ 500,00' variant='secondary'  />
      </div>

      <div className='mt-4 bg-dark-blue-500 p-4 rounded'>
        <Chart options={options} series={series} type="line" width='100%' height={400} />
      </div>
    </div>
  )
}

Overview.getLayout = function getLayout(page: ReactElement) {
  return (
    <DefaultLayout>
      {page}
    </DefaultLayout>
  )
}

export default Overview