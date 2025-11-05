interface CampaignFiltersProps {
  onFilterChange: (filters: FilterState) => void
}

export interface FilterState {
  category?: string
  search?: string
  sortBy?: 'recent' | 'popular' | 'ending'
}

export function CampaignFilters({ onFilterChange }: CampaignFiltersProps) {
  return (
    <div className="flex flex-wrap gap-4 mb-6">
      <input
        type="text"
        placeholder="Search campaigns..."
        onChange={(e) => onFilterChange({ search: e.target.value })}
        className="flex-1 min-w-[200px] px-4 py-2 border rounded-md"
      />
      <select
        onChange={(e) => onFilterChange({ category: e.target.value })}
        className="px-4 py-2 border rounded-md"
      >
        <option value="">All Categories</option>
        <option value="medical">Medical</option>
        <option value="education">Education</option>
        <option value="emergency">Emergency</option>
        <option value="community">Community</option>
      </select>
      <select
        onChange={(e) => onFilterChange({ sortBy: e.target.value as FilterState['sortBy'] })}
        className="px-4 py-2 border rounded-md"
      >
        <option value="recent">Most Recent</option>
        <option value="popular">Most Popular</option>
        <option value="ending">Ending Soon</option>
      </select>
    </div>
  )
}
