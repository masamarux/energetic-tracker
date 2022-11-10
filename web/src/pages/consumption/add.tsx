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
import { useRouter } from 'next/router';
import Head from 'next/head';
import CurrencyInput from 'react-currency-input-field';
import { clearPriceFormatting } from '../../utils/formatter';

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
  const { push } = useRouter()
  const { handleSubmit, reset, control, formState: {errors}, setError } = useForm<FieldValues>({
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
    console.log()
    setLoading(true)
    try {
      await axios.post('/api/createConsumption', {
        ...data,
        value: clearPriceFormatting(data.value),
        discount: clearPriceFormatting(data.discount),
        consumption: clearPriceFormatting(data.consumption)
      })

      reset()
    } catch (error: any) {
      if (error.response.status === 401) {
        push('/logout')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Head>
        <title>Adicionar consumo | Energetic Tracker</title>
        <meta name="robots" content="noindex"/>
      </Head>

      <div>
      <strong className='flex flex-row items-center gap-4 text-lg font-bold text-gray-100 mb-4'><Plus weight='bold' className='text-green-500' /> Adicione um novo consumo:</strong>

      <div className='grid md:grid-cols-7-3 grid-1'>
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
                render={({ field: {name, onBlur, onChange, ref, value} }) => (
                  <Input.Currency
                    ref={ref}
                    name={name}
                    placeholder="Quantos kw foram consumidos?"
                    defaultValue={0}
                    onValueChange={onChange}
                    onBlur={onBlur}
                    value={value}
                  />
                )}
              />
              <span className='text-md'>
                kW
              </span>
            </Input.Container>
          </label>

          <label className='grid grid-cols-3-7 items-center gap-4 text-dark-blue-100 text-lg font-bold'>Valor
            <Input.Container hasError={!!errors.value}>
              <Controller
                name='value'
                control={control}
                render={({ field: {name, onBlur, onChange, ref, value} }) => (
                  <Input.Currency
                    ref={ref}
                    name={name}
                    placeholder="Informe o valor pago"
                    defaultValue={0.00}
                    onValueChange={onChange}
                    onBlur={onBlur}
                    value={value}
                    intlConfig={{ locale: 'pt-BR', currency: 'BRL' }}
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
                render={({ field: {name, onBlur, onChange, ref, value} }) => (
                  <Input.Currency
                    ref={ref}
                    name={name}
                    placeholder="Caso teve algum desconto, informe aqui"
                    defaultValue={0.00}
                    onValueChange={onChange}
                    onBlur={onBlur}
                    value={value}
                    intlConfig={{ locale: 'pt-BR', currency: 'BRL' }}
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
    </>

  )
}

Add.getLayout = function getLayout(page: ReactElement) {
  return (
    <DefaultLayout>
      {page}
    </DefaultLayout>
  )
}

export default Add