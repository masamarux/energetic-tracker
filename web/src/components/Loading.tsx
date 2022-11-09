import ReactLoading from 'react-loading'

export function Loading() {
  return(
    <div className='flex items-center justify-center w-full h-6'>
      <ReactLoading
        type='bubbles'
      />
    </div>
    
  )
}