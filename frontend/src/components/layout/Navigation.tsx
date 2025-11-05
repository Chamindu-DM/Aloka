import { useAuth } from '../../features/auth/hooks/useAuth'
import { Button } from '../ui/button'

export function Navigation() {
  const { isAuthenticated, logout } = useAuth()

  return (
    <nav className="flex items-center gap-6">
      <a href="/campaigns" className="text-gray-700 hover:text-blue-600">
        Campaigns
      </a>
      <a href="/how-it-works" className="text-gray-700 hover:text-blue-600">
        How It Works
      </a>
      {isAuthenticated ? (
        <>
          <a href="/dashboard" className="text-gray-700 hover:text-blue-600">
            Dashboard
          </a>
          <Button variant="outline" onClick={logout}>
            Logout
          </Button>
        </>
      ) : (
        <>
          <a href="/signin" className="text-gray-700 hover:text-blue-600">
            Sign In
          </a>
          <Button asChild>
            <a href="/signup">Sign Up</a>
          </Button>
        </>
      )}
    </nav>
  )
}
