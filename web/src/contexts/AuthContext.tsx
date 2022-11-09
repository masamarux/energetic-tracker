import axios from 'axios';
import { createContext, ReactNode, useState } from 'react';

interface LoginProps {
  email: string
  password: string
}

interface SignUpProps {
  name: string
  email: string
  password: string
}

interface AuthContextData {
  loading: boolean;
  name: string;
  login: (data: LoginProps) => void;
  signUp: (data: SignUpProps) => void;
}

export const AuthContext = createContext({} as AuthContextData);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({children}: AuthProviderProps) {
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);

  async function login(data: LoginProps) {
    setLoading(true);
    try {
      const response = await axios.post('/api/login', data)
      console.log(response.data.user.name)
      setName(response.data.user.name)
    } catch (error) {
      console.log(error)
      setLoading(false);
    }
  }

  async function signUp(data: SignUpProps) {
    setLoading(true);
    try {
      await axios.post('/api/signup', data)
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false);
    }
    
  }

  return (
    <AuthContext.Provider value={{name, loading, login, signUp}}>
      {children}
    </AuthContext.Provider>
  )
}