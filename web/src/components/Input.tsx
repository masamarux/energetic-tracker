import { forwardRef, InputHTMLAttributes, ReactNode, useEffect, useState } from 'react';
import { EyeClosed, Eye } from "phosphor-react";

interface InputContainerProps {
  children: ReactNode
}

function InputContainer({children}: InputContainerProps) {
  return (
    <div className="flex flex-row rounded p-3 bg-dark-blue-500 focus-within:ring-2 ring-green-400">
      {children}
    </div>
    
  )
}

type RefInput = HTMLInputElement

const InputInput = forwardRef<RefInput, InputHTMLAttributes<HTMLInputElement>>((props, ref) => {
  const {name, type, ...rest} = props;

  return (
    <input 
      ref={ref}
      className="bg-transparent text-gray-100 placeholder:text-dark-blue-100 text-md font-normal flex-1 focus:outline-none"
      {...rest}
    />
  )
})

type RefPassword = HTMLInputElement

const PasswordInput = forwardRef<RefPassword, InputHTMLAttributes<HTMLInputElement>>((props, ref) => {
  const {name, type, ...rest} = props;
  const [newType, setNewType] = useState(type);
  const [showPassword, setShowPassword] = useState(false);

  function handleChangeShowPassword() {
    setShowPassword(prevState => !prevState);
  }

  useEffect(() => {
    if(name === 'password') {
      showPassword ? setNewType('text') : setNewType('password')
    }
  }, [showPassword])

  return (
    <>
      <input 
        ref={ref} 
        className="bg-transparent text-gray-100 placeholder:text-dark-blue-100 text-md font-normal flex-1 focus:outline-none"
        {...rest}
        type={newType}
      />
      {
        name === 'password' && (
          <button type='button' onClick={handleChangeShowPassword} className="text-gray-100">
            {
              !showPassword ? <EyeClosed size={24} /> : <Eye size={24} />
            }
          </button>
        )
      }
    </>
    
  )
})

export const Input = {
  Container: InputContainer,
  Input: InputInput,
  Password: PasswordInput
}