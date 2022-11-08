import { ReactElement } from 'react'
import { NextPageWithLayout } from './../_app'
import DefaultLayout from '../../layouts/DefaultLayout'
import { Input } from '../../components/Input'
import { useForm } from 'react-hook-form'
import { Button } from '../../components/Button'
import { Plus } from 'phosphor-react'

interface AddConsumptionInputProps {
  tag: string
  date: string
  value: number
  discount: number
  consumption: number
}

const Add: NextPageWithLayout = () => {
  const { register, handleSubmit } = useForm<AddConsumptionInputProps>()

  function handleAddConsumption(data: AddConsumptionInputProps) {
    console.log(data)
  }

  return (
    <div>
      <strong className='flex flex-row items-center gap-4 text-lg font-bold text-gray-100 mb-4'><Plus weight='bold' className='text-green-500' /> Adicione um novo consumo:</strong>

      <div className='grid grid-cols-7-3'>
        <form onSubmit={handleSubmit(handleAddConsumption)} className="flex flex-col gap-3">
          <label className='grid grid-cols-3-7 items-center gap-4 text-dark-blue-100 text-lg font-bold'>Tag
            <Input
              type="text"
              placeholder='Tag do consumo, ex: Luz do apartamento'
              {...register('tag')}
            />
          </label>

          <label className='grid grid-cols-3-7 items-center gap-4 text-dark-blue-100 text-lg font-bold'>Data
            <Input
              type="text"
              placeholder='05/11/2022'
              {...register('date')}
            />
          </label>

          <label className='grid grid-cols-3-7 items-center gap-4 text-dark-blue-100 text-lg font-bold'>Consumo
            <Input
              type="text"
              placeholder='Quantos kw foram consumidos?'
              {...register('consumption')}
            />
          </label>

          <label className='grid grid-cols-3-7 items-center gap-4 text-dark-blue-100 text-lg font-bold'>Valor
            <Input
              type="number"
              placeholder='R$ 0,00'
              {...register('value')}
            />
          </label>

          <label className='grid grid-cols-3-7 items-center gap-4 text-dark-blue-100 text-lg font-bold'>Desconto
            <Input
              type="number"
              placeholder='Caso teve algum desconto, informe aqui'
              {...register('discount')}
            />
          </label>

          <Button type="submit">
            Salvar
          </Button>
        </form>
      </div>
    </div>
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