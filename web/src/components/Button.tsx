import clsx from 'clsx'
import { ButtonHTMLAttributes } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'tertiary'
}

export function Button({ children, variant = 'primary', disabled, ...rest}: ButtonProps) {
  return (
    <button
      className={
        clsx('p-4 rounded w-full text-gray-100 text-md font-bold focus:outline-none focus:ring-2 ring-green-400 disabled:opacity-60 disabled:cursor-not-allowed', {
          [`bg-green-500 ${!disabled && 'hover:bg-green-400'}`]: variant === 'primary',
          [`bg-cyan-700 ${!disabled && 'hover:bg-cyan-600'}`]: variant === 'secondary',
          [`bg-dark-blue-400 ${!disabled && 'hover:bg-dark-blue-350'}`]: variant === 'tertiary',
        })
      }
      disabled={disabled}
      {...rest}
    >
      {children}
    </button>
  )
}