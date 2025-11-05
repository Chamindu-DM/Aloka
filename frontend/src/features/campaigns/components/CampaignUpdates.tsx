interface Update {
  id: string
  title: string
  content: string
  date: string
}

interface CampaignUpdatesProps {
  updates: Update[]
}

export function CampaignUpdates({ updates }: CampaignUpdatesProps) {
  if (updates.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">No updates yet</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-semibold">Campaign Updates</h3>
      {updates.map((update) => (
        <div key={update.id} className="border-b pb-6">
          <div className="flex justify-between items-start mb-2">
            <h4 className="text-lg font-medium">{update.title}</h4>
            <span className="text-sm text-gray-500">{new Date(update.date).toLocaleDateString()}</span>
          </div>
          <p className="text-gray-700">{update.content}</p>
        </div>
      ))}
    </div>
  )
}
