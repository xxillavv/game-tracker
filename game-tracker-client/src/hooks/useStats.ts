import { syncStats } from "@/app/profile/queries"
import { useMutation } from "@tanstack/react-query"
import { AxiosError, AxiosResponse, } from "axios"
import { useRouter } from "next/navigation"

export const useStats = () => {
  const router = useRouter()

  const syncStatsMutation = useMutation<AxiosResponse, AxiosError>({
    mutationKey: ['sync-dota-stats'],
    mutationFn: syncStats,
    onSuccess: () => {
      router.refresh()
    }
  })

  return {
    syncStats: syncStatsMutation
  }
}