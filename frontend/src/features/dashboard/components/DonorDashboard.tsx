export function DonorDashboard() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Donor Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="border rounded-lg p-6">
          <p className="text-gray-600 mb-2">Total Donated</p>
          <p className="text-3xl font-bold text-blue-600">$0</p>
        </div>
        <div className="border rounded-lg p-6">
          <p className="text-gray-600 mb-2">Campaigns Supported</p>
          <p className="text-3xl font-bold">0</p>
        </div>
        <div className="border rounded-lg p-6">
          <p className="text-gray-600 mb-2">Lives Impacted</p>
          <p className="text-3xl font-bold">0</p>
        </div>
      </div>

      <div className="border rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Recent Donations</h2>
        <p className="text-gray-500">No donations yet</p>
      </div>
    </div>
  )
}
