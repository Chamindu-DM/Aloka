import { createContext, ReactNode, useContext, useState } from 'react'

interface User {
  id: string
  email: string
  name: string
  role?: string
}

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  signup: (email: string, password: string, name: string) => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

interface AuthProviderProps {
  children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null)

  const login = async (email: string, password: string) => {
    // TODO: Implement actual login logic
    console.log('Login:', email, password)
    setUser({ id: '1', email, name: 'User' })
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('token')
  }

  const signup = async (email: string, password: string, name: string) => {
    // TODO: Implement actual signup logic
    console.log('Signup:', email, password, name)
    setUser({ id: '1', email, name })
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        logout,
        signup,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuthContext() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuthContext must be used within an AuthProvider')
  }
  return context
}
