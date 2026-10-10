import { syncStats } from "@/api/stats.api"
import { useMutation } from "@tanstack/react-query"
import { AxiosError } from "axios"
import { useRouter } from "next/navigation"
import { IAxiosResponseError } from "./useAuth"

export const useStats = () => {
  const router = useRouter()

  const syncStatsMutation = useMutation<void, AxiosError<IAxiosResponseError>>({
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