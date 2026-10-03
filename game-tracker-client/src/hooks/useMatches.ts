import { syncMatches } from "@/api/matches.api"
import { useMutation } from "@tanstack/react-query"
import { AxiosError } from "axios"
import { useRouter } from "next/navigation"
import { IAxiosResponseError } from "./useAuth"

export const useMatches = () => {
  const router = useRouter()

  const syncMatchesMutation = useMutation<void, AxiosError<IAxiosResponseError>>({
    mutationKey: ['sync-dota-matches'],
    mutationFn: syncMatches,
    onSuccess: () => {
      router.refresh()
    }
  })

  return {
    syncMatches: syncMatchesMutation
  }
}
