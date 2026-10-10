import axios from "axios"

export const syncLeaderboard = async () => {
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}/leaderboard/dota/sync`,
    null,
    {
      withCredentials: true
    }
  )

  return response.data
}
