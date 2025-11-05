import { SignUpForm } from '../features/auth/components/SignUpForm'
import { Header } from '../components/layout/Header'
import { Footer } from '../components/layout/Footer'

export function SignUpPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 flex items-center justify-center bg-gray-50">
        <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8">
          <h1 className="text-3xl font-bold text-center mb-6">Sign Up</h1>
          <SignUpForm />
          <div className="mt-4 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{' '}
              <a href="/signin" className="text-blue-600 hover:underline">
                Sign in
              </a>
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
