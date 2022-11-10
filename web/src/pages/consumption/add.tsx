import { ReactElement, useContext, useEffect, useState } from 'react'
import * as z from 'zod';
import { Controller, useForm } from 'react-hook-form'
import {zodResolver} from '@hookform/resolvers/zod';
import { Plus } from 'phosphor-react'

import { NextPageWithLayout } from './../_app'
import DefaultLayout from '../../layouts/DefaultLayout'
import { Input } from '../../components/Input'
import { Button } from '../../components/Button'
import axios from 'axios';
import { Loading } from '../../components/Loading';
import { AuthContext } from '../../contexts/AuthContext';
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';
import { getCookie } from 'cookies-next';


type FieldValues = {
  tag: string
  date: string
  value: number | string
  discount: number | string
  consumption: number | string
}

const addConsumptionInputProps = z.object({
  tag: z.string().min(2),
  date: z.string(),
  value: z.number().min(0).or(z.string()),
  discount: z.number().optional().or(z.string()),
  consumption: z.number().min(0).or(z.string())
});

const Add: NextPageWithLayout = () => {
  const [loading, setLoading] = useState(false)
  const {name} = useContext(AuthContext);
  const { push } = useRouter()
  const { register, handleSubmit, reset, control, formState: {errors}, setError } = useForm<FieldValues>({
    resolver: zodResolver(addConsumptionInputProps),
    defaultValues: {
      tag: '',
      date: '',
      value: 0,
      consumption: 0,
      discount: 0
    }
  })

  async function handleAddConsumption(data: FieldValues) {
    setLoading(true)
    try {
      await axios.post('/api/createConsumption', data)

      reset()
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if(!name) {
      push('/')
    }
  }, [name])

  return (
    <div>
      <strong className='flex flex-row items-center gap-4 text-lg font-bold text-gray-100 mb-4'><Plus weight='bold' className='text-green-500' /> Adicione um novo consumo:</strong>

      <div className='grid grid-cols-7-3'>
        <form onSubmit={handleSubmit(handleAddConsumption)} className="flex flex-col gap-3">
          <label className='grid grid-cols-3-7 items-center gap-4 text-dark-blue-100 text-lg font-bold'>Tag
            <Input.Container hasError={!!errors.tag}>
              <Controller
                name='tag'
                control={control}
                render={({ field }) => (
                  <Input.Input
                    type="text"
                    placeholder='Tag do consumo, ex: Luz do apartamento'
                    {...field}
                  />
                )}
              />
            </Input.Container>
          </label>

          <label className='grid grid-cols-3-7 items-center gap-4 text-dark-blue-100 text-lg font-bold'>Data
            <Input.Container hasError={!!errors.date}>
              <Controller
                name='date'
                control={control}
                render={({ field }) => (
                  <Input.Input
                    type="date"
                    placeholder='05/11/2022'
                    {...field}
                  />
                )}
              />
            </Input.Container>
          </label>

          <label className='grid grid-cols-3-7 items-center gap-4 text-dark-blue-100 text-lg font-bold'>Consumo
            <Input.Container hasError={!!errors.consumption}>
              <Controller
                name='consumption'
                control={control}
                render={({ field }) => (
                  <Input.Input
                    type="number"
                    placeholder='Quantos kw foram consumidos?'
                    {...field}
                  />
                )}
              />
            </Input.Container>
          </label>

          <label className='grid grid-cols-3-7 items-center gap-4 text-dark-blue-100 text-lg font-bold'>Valor
            <Input.Container hasError={!!errors.value}>
              <Controller
                name='value'
                control={control}
                render={({ field }) => (
                  <Input.Input
                    type="number"
                    placeholder='R$ 0,00'
                    {...field}
                  />
                )}
              />
            </Input.Container>
          </label>

          <label className='grid grid-cols-3-7 items-center gap-4 text-dark-blue-100 text-lg font-bold'>Desconto
            <Input.Container hasError={!!errors.discount}>
              <Controller
                name='discount'
                control={control}
                render={({ field }) => (
                  <Input.Input
                    type="number"
                    placeholder='Caso teve algum desconto, informe aqui'
                    {...field}
                  />
                )}
              />
            </Input.Container>
            
          </label>

          <Button type="submit">
            {
              loading ? <Loading /> : 'Adicionar'
            }
          </Button>
        </form>
      </div>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async ({req, res}) => {
  const token = getCookie('token', {req, res})
  if(!token) return {
    redirect: {
      destination: '/logout',
      permanent: false,
    }
  }

  return {
    props: {}
  }
}

Add.getLayout = function getLayout(page: ReactElement) {
  return (
    <DefaultLayout>
      {page}
    </DefaultLayout>
  )
}

export default Add