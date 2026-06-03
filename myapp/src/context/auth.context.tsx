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
import AsyncStorage from "@react-native-async-storage/async-storage"
import { IAuthenticateResponse } from "@/shared/interfaces/https/authenticate-response"

type AuthContextType = {
  user: IUser | null;
  token: string | null;
  handleAuthenticate: (params: FormLoginParams) => Promise<void>;
  handleRegister: (params: FormRegisterParams) => Promise<void>;
  handleLogout: () => void;
  restoreUserSession: () => Promise<string | null>;
}

export const AuthContext = createContext<AuthContextType>(
  {} as AuthContextType)

// FC: Function Component
export const AuthContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [token, setToken] = useState<string | null>(null)

  const handleAuthenticate = async (userData: FormLoginParams) => {
    const { user, token } = await authService.authenticate(userData)
    await AsyncStorage.setItem("dt-money-user", JSON.stringify({user, token}))

    console.log(user, token)
    setUser(user)
    setToken(token)
  }

  const handleRegister = async (formData: FormRegisterParams) => { 
    const { token, user } = await authService.registerUser(formData);
    setUser(user)
    setToken(token)
  }

  const restoreUserSession = async () => {
    const userData = await AsyncStorage.getItem('dt-money-user')

    if (userData) {
      const { token, user } = JSON.parse(userData) as IAuthenticateResponse
      setToken(token)
      setUser(user)
    }

    return userData
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
        restoreUserSession
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