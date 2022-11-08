interface StatusItemProps {
  title: string
  value: string
}

export function StatusItem({ title, value }: StatusItemProps) {
  return (
    <div className='flex flex-col'>
      <span className='text-dark-blue-300 font-bold text-2md'>{title}</span>
      <span className='text-dark-blue-200 font-bold text-2md'>{value}</span>
    </div>
  )
}