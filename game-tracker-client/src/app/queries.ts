import { ILeaderboardResponse } from "@/types/leaderboard.types"
import { cookies } from "next/headers"

export const getLeaderboardData = async (page: number): Promise<ILeaderboardResponse> => {
  const cookieStore = await cookies()

  const limit = 10

  const response = await fetch(`http://localhost:3001/api/leaderboard/dota?limit=${limit}&page=${page}`,
    {
      headers: {
        Cookie: cookieStore.toString()
      }
    }
  )

  return response.json()
}