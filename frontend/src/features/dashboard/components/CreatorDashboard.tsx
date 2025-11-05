export function CreatorDashboard() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Creator Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="border rounded-lg p-6">
          <p className="text-gray-600 mb-2">Total Raised</p>
          <p className="text-3xl font-bold text-green-600">$0</p>
        </div>
        <div className="border rounded-lg p-6">
          <p className="text-gray-600 mb-2">Active Campaigns</p>
          <p className="text-3xl font-bold">0</p>
        </div>
        <div className="border rounded-lg p-6">
          <p className="text-gray-600 mb-2">Total Donors</p>
          <p className="text-3xl font-bold">0</p>
        </div>
        <div className="border rounded-lg p-6">
          <p className="text-gray-600 mb-2">Available Funds</p>
          <p className="text-3xl font-bold text-blue-600">$0</p>
        </div>
      </div>

      <div className="border rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Your Campaigns</h2>
        <p className="text-gray-500">No campaigns created yet</p>
      </div>
    </div>
  )
}
