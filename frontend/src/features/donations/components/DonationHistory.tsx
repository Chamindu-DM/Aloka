import type { Donation } from '../../../types/donation'

interface DonationHistoryProps {
  donations: Donation[]
}

export function DonationHistory({ donations }: DonationHistoryProps) {
  if (donations.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">No donations yet</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold mb-4">Your Donations</h2>
      {donations.map((donation) => (
        <div key={donation.id} className="border rounded-lg p-4">
          <div className="flex justify-between items-start mb-2">
            <div>
              <h3 className="font-medium">{donation.campaignTitle}</h3>
              <p className="text-sm text-gray-500">
                {new Date(donation.date).toLocaleDateString()}
              </p>
            </div>
            <div className="text-right">
              <p className="font-bold text-lg">${donation.amount.toLocaleString()}</p>
              <span
                className={`text-xs px-2 py-1 rounded ${
                  donation.status === 'completed'
                    ? 'bg-green-100 text-green-800'
                    : donation.status === 'pending'
                    ? 'bg-yellow-100 text-yellow-800'
                    : 'bg-red-100 text-red-800'
                }`}
              >
                {donation.status}
              </span>
            </div>
          </div>
          {donation.message && (
            <p className="text-sm text-gray-600 italic">"{donation.message}"</p>
          )}
        </div>
      ))}
    </div>
  )
}
