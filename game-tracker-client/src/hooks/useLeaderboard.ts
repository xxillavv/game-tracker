import { syncLeaderboard } from "@/api/leaderboard.api"
import { useMutation } from "@tanstack/react-query"
import { AxiosError } from "axios"
import { useRouter } from "next/navigation"
import { IAxiosResponseError } from "./useAuth"

export const useLeaderboard = () => {
  const router = useRouter()

  const syncLeaderboardMutation = useMutation<void, AxiosError<IAxiosResponseError>>({
    mutationKey: ['sync-dota-leaderboard'],
    mutationFn: syncLeaderboard,
    onSuccess: () => {
      router.refresh()
    }
  })

  return {
    syncLeaderboard: syncLeaderboardMutation
  }
}
