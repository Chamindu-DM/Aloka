import { AppProviders } from './providers/AppProviders'
import { AppRoutes } from '../routes'
import '../styles/globals.css'

function App() {
  return (
    <AppProviders>
      <AppRoutes />
    </AppProviders>
  )
}

export default App
