import NavigationRoutes from '@/routes'
import './src/styles/global.css'
import { StatusBar } from 'expo-status-bar'
import { AuthContextProvider }
  from '@/context/auth.context'

export default function App() {
  return (
    <AuthContextProvider>
      <StatusBar style="light" />
      <NavigationRoutes />
    </AuthContextProvider>
  )
}
