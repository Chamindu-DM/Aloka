interface Disbursement {
  id: string
  date: string
  amount: number
  status: 'pending' | 'approved' | 'completed' | 'rejected'
  description: string
}

interface DisbursementTrackerProps {
  campaignId: string
}

export function DisbursementTracker({ campaignId }: DisbursementTrackerProps) {
  // TODO: Fetch actual disbursement data
  const disbursements: Disbursement[] = []

  return (
    <div className="border rounded-lg p-6">
      <h3 className="text-xl font-semibold mb-4">Disbursement History</h3>
      {disbursements.length === 0 ? (
        <p className="text-gray-500">No disbursements yet</p>
      ) : (
        <div className="space-y-4">
          {disbursements.map((disbursement) => (
            <div key={disbursement.id} className="border-b pb-4">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <p className="font-medium">{disbursement.description}</p>
                  <p className="text-sm text-gray-500">
                    {new Date(disbursement.date).toLocaleDateString()}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-bold">${disbursement.amount.toLocaleString()}</p>
                  <span
                    className={`text-xs px-2 py-1 rounded ${
                      disbursement.status === 'completed'
                        ? 'bg-green-100 text-green-800'
                        : disbursement.status === 'pending'
                        ? 'bg-yellow-100 text-yellow-800'
                        : disbursement.status === 'approved'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {disbursement.status}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
