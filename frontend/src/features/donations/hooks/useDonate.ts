import { useMutation, useQueryClient } from '@tanstack/react-query'
import { donationsApi } from '../api/donationsApi'

export function useDonate() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: donationsApi.createDonation,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['donations'] })
      queryClient.invalidateQueries({ queryKey: ['campaigns'] })
    },
  })
}
