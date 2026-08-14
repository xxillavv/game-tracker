import { useMutation } from "@tanstack/react-query"
import axios, { AxiosError, AxiosResponse, } from "axios"
import { useRouter } from "next/navigation"

const syncStats = async () => {
  const response = await axios.post(
    "http://localhost:3001/api/stats/dota/sync",
    null,
    {
      withCredentials: true
    }
  )

  return response.data
}

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