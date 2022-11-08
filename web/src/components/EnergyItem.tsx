import clsx from 'clsx'
import * as Separator from '@radix-ui/react-separator'

interface EnergyItemProps {
  title: string
  value: string
  variant?: 'primary' | 'secondary'
}

export function EnergyItem({title, value, variant="primary"}: EnergyItemProps) {
  return (
    <div className={
      clsx('flex flex-col justify-between p-2 border rounded bg-dark-blue-500', {
        'border-cyan-700 ': variant === 'primary',
        'border-green-500': variant === 'secondary',
      })
    }>
      <strong className='text-gray-200 font-bold h-12 flex items-start'>{title}</strong>
      <Separator.Root orientation='horizontal' decorative className='bg-dark-blue-700 w-full h-px my-2' />
      <span className={
        clsx('font-bold', {
          'text-cyan-600': variant === 'primary',
          'text-green-500': variant === 'secondary',
        })
      }>{value}</span>
    </div>
  )
}