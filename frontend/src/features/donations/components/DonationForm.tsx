import { useState } from 'react'
import { Button } from '../../../components/ui/button'

interface DonationFormProps {
  campaignId: string
  onSuccess?: () => void
}

export function DonationForm({ campaignId, onSuccess }: DonationFormProps) {
  const [amount, setAmount] = useState('')
  const [customAmount, setCustomAmount] = useState('')
  const [anonymous, setAnonymous] = useState(false)
  const [message, setMessage] = useState('')

  const presetAmounts = [10, 25, 50, 100, 250, 500]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const donationAmount = amount === 'custom' ? parseFloat(customAmount) : parseFloat(amount)
    // TODO: Implement donation logic
    console.log('Donate:', { campaignId, amount: donationAmount, anonymous, message })
    onSuccess?.()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium mb-3">Select Amount</label>
        <div className="grid grid-cols-3 gap-3 mb-3">
          {presetAmounts.map((preset) => (
            <button
              key={preset}
              type="button"
              onClick={() => setAmount(preset.toString())}
              className={`py-3 px-4 border rounded-md ${
                amount === preset.toString()
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'border-gray-300 hover:border-blue-600'
              }`}
            >
              ${preset}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <input
            type="radio"
            id="custom"
            checked={amount === 'custom'}
            onChange={() => setAmount('custom')}
          />
          <label htmlFor="custom">Custom amount</label>
          {amount === 'custom' && (
            <input
              type="number"
              value={customAmount}
              onChange={(e) => setCustomAmount(e.target.value)}
              placeholder="Enter amount"
              className="ml-2 px-3 py-2 border rounded-md flex-1"
              min="1"
              required
            />
          )}
        </div>
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium mb-2">
          Message (Optional)
        </label>
        <textarea
          id="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={4}
          className="w-full px-3 py-2 border rounded-md"
          placeholder="Leave a message of support..."
        />
      </div>

      <div className="flex items-center">
        <input
          type="checkbox"
          id="anonymous"
          checked={anonymous}
          onChange={(e) => setAnonymous(e.target.checked)}
          className="mr-2"
        />
        <label htmlFor="anonymous" className="text-sm">
          Make this donation anonymous
        </label>
      </div>

      <Button type="submit" className="w-full" size="lg">
        Continue to Payment
      </Button>
    </form>
  )
}
