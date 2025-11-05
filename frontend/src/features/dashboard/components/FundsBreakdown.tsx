interface FundsBreakdownProps {
  campaignId: string
}

export function FundsBreakdown({ campaignId }: FundsBreakdownProps) {
  // TODO: Fetch actual funds data
  const breakdown = {
    totalRaised: 10000,
    platformFee: 500,
    processingFee: 300,
    availableForDisbursement: 9200,
    disbursed: 5000,
    remaining: 4200,
  }

  return (
    <div className="border rounded-lg p-6">
      <h3 className="text-xl font-semibold mb-4">Funds Breakdown</h3>
      <div className="space-y-3">
        <div className="flex justify-between">
          <span>Total Raised</span>
          <span className="font-bold">${breakdown.totalRaised.toLocaleString()}</span>
        </div>
        <div className="flex justify-between text-red-600">
          <span>Platform Fee (5%)</span>
          <span>-${breakdown.platformFee.toLocaleString()}</span>
        </div>
        <div className="flex justify-between text-red-600">
          <span>Processing Fee</span>
          <span>-${breakdown.processingFee.toLocaleString()}</span>
        </div>
        <div className="border-t pt-3 flex justify-between font-semibold">
          <span>Available for Disbursement</span>
          <span className="text-green-600">
            ${breakdown.availableForDisbursement.toLocaleString()}
          </span>
        </div>
        <div className="flex justify-between">
          <span>Already Disbursed</span>
          <span>${breakdown.disbursed.toLocaleString()}</span>
        </div>
        <div className="border-t pt-3 flex justify-between font-bold text-lg">
          <span>Remaining</span>
          <span className="text-blue-600">${breakdown.remaining.toLocaleString()}</span>
        </div>
      </div>
    </div>
  )
}
