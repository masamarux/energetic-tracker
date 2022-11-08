import { createContext, ReactNode, useState } from 'react';

interface AuthContextData {
  name: string;
}

export const AuthContext = createContext({} as AuthContextData);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({children}: AuthProviderProps) {
  const [name, setName] = useState('');

  return (
    <AuthContext.Provider value={{name}}>
      {children}
    </AuthContext.Provider>
  )
}