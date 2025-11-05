import { useQuery } from '@tanstack/react-query'
import { dashboardApi } from '../api/dashboardApi'

export function useDashboard(type: 'donor' | 'creator') {
  return useQuery({
    queryKey: ['dashboard', type],
    queryFn: () => dashboardApi.getDashboardData(type),
  })
}
