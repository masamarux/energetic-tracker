import { forwardRef, InputHTMLAttributes, useEffect, useState } from 'react';
import { EyeClosed, Eye } from "phosphor-react";

export type Ref = HTMLInputElement

export const Input = forwardRef<Ref, InputHTMLAttributes<HTMLInputElement>>((props, ref) => {
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
    <div className="flex flex-row rounded p-3 bg-dark-blue-500 focus-within:ring-2 ring-green-400">
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
    </div>
    
  )
})