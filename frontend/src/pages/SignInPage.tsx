import { SignInForm } from '../features/auth/components/SignInForm'
import { Header } from '../components/layout/Header'
import { Footer } from '../components/layout/Footer'

export function SignInPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 flex items-center justify-center bg-gray-50">
        <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8">
          <h1 className="text-3xl font-bold text-center mb-6">Sign In</h1>
          <SignInForm />
          <div className="mt-4 text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{' '}
              <a href="/signup" className="text-blue-600 hover:underline">
                Sign up
              </a>
            </p>
            <a href="/forgot-password" className="text-sm text-blue-600 hover:underline mt-2 block">
              Forgot password?
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
