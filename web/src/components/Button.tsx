import clsx from 'clsx'
import { ButtonHTMLAttributes } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary'
}

export function Button({ children, variant = 'primary',...rest}: ButtonProps) {
  return (
    <button
      className={
        clsx('p-4 rounded w-full text-gray-100 text-md font-bold focus:outline-none focus:ring-2 ring-green-400 ', {
          'bg-green-500 hover:bg-green-400': variant === 'primary',
          'bg-cyan-700 hover:bg-cyan-600': variant === 'secondary',
        })
      }
      {...rest}
    >
      {children}
    </button>
  )
}