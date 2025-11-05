import { useState } from 'react'
import { Button } from '../../../components/ui/button'

export function ForgotPasswordForm() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Implement forgot password logic
    console.log('Forgot password:', email)
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="text-center">
        <p className="text-green-600">
          Password reset link has been sent to your email.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="email" className="block text-sm font-medium">
          Email
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
          required
        />
      </div>
      <Button type="submit" className="w-full">
        Send Reset Link
      </Button>
    </form>
  )
}
