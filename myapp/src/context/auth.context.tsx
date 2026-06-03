import { FormLoginParams } from "@/screens/Login/LoginForm"
import { FormRegisterParams } from "@/screens/Register/RegisterForm"
import {
  createContext,
  FC,
  PropsWithChildren,
  useState,
  useContext
} from "react"

import * as authService from '@/services/dt-money/auth-services'
import { IUser } from "@/shared/interfaces/https/user-interface"

type AuthContextType = {
  user: IUser | null;
  token: string | null;
  handleAuthenticate: (params: FormLoginParams) => Promise<void>;
  handleRegister: (params: FormRegisterParams) => Promise<void>;
  handleLogout: () => void;
}

export const AuthContext = createContext<AuthContextType>(
  {} as AuthContextType)

// FC: Function Component
export const AuthContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [token, setToken] = useState<string | null>(null)

  const handleAuthenticate = async (userData: FormLoginParams) => {
    const { user, token } = await authService.authenticate(userData)
    console.log(user, token)
    setUser(user)
    setToken(token)
  }

  const handleRegister = async (formData: FormRegisterParams) => { 
    const { token, user } = await authService.registerUser(formData);
    setUser(user)
    setToken(token)
  }

  const handleLogout = () => { }

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        handleAuthenticate,
        handleRegister,
        handleLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuthContext = () => {
  const context = useContext(AuthContext)
  return context
}