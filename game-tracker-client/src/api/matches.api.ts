import axios from "axios"

export const syncMatches = async () => {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/matches/dota/sync`,
    {
      withCredentials: true
    }
  )

  return response.data
}
