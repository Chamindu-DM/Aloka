import { useState } from 'react'
import { Button } from '../../../components/ui/button'

interface PaymentFormProps {
  amount: number
  onSubmit: (paymentData: PaymentData) => void
}

export interface PaymentData {
  cardNumber: string
  expiryDate: string
  cvv: string
  name: string
}

export function PaymentForm({ amount, onSubmit }: PaymentFormProps) {
  const [formData, setFormData] = useState<PaymentData>({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    name: '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="bg-blue-50 p-4 rounded-lg mb-6">
        <p className="text-sm text-gray-600">Donation Amount</p>
        <p className="text-3xl font-bold text-blue-600">${amount.toLocaleString()}</p>
      </div>

      <div>
        <label htmlFor="name" className="block text-sm font-medium mb-2">
          Cardholder Name
        </label>
        <input
          type="text"
          id="name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full px-3 py-2 border rounded-md"
          required
        />
      </div>

      <div>
        <label htmlFor="cardNumber" className="block text-sm font-medium mb-2">
          Card Number
        </label>
        <input
          type="text"
          id="cardNumber"
          value={formData.cardNumber}
          onChange={(e) => setFormData({ ...formData, cardNumber: e.target.value })}
          placeholder="1234 5678 9012 3456"
          className="w-full px-3 py-2 border rounded-md"
          maxLength={19}
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="expiryDate" className="block text-sm font-medium mb-2">
            Expiry Date
          </label>
          <input
            type="text"
            id="expiryDate"
            value={formData.expiryDate}
            onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })}
            placeholder="MM/YY"
            className="w-full px-3 py-2 border rounded-md"
            maxLength={5}
            required
          />
        </div>
        <div>
          <label htmlFor="cvv" className="block text-sm font-medium mb-2">
            CVV
          </label>
          <input
            type="text"
            id="cvv"
            value={formData.cvv}
            onChange={(e) => setFormData({ ...formData, cvv: e.target.value })}
            placeholder="123"
            className="w-full px-3 py-2 border rounded-md"
            maxLength={4}
            required
          />
        </div>
      </div>

      <Button type="submit" className="w-full" size="lg">
        Donate ${amount.toLocaleString()}
      </Button>

      <p className="text-xs text-gray-500 text-center">
        Your payment information is secure and encrypted
      </p>
    </form>
  )
}
