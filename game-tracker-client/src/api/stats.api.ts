import axios from "axios"

export const syncStats = async () => {
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}/stats/dota/sync`,
    null,
    {
      withCredentials: true
    }
  )

  return response.data
}