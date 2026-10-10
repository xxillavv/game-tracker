import { ILeaderboardResponse } from "@/types/leaderboard.types"
import { cookies } from "next/headers"

export const getLeaderboardData = async (page: number): Promise<ILeaderboardResponse> => {
  const cookieStore = await cookies()

  const limit = 10

  const response = await fetch(`${process.env.API_URL}/leaderboard/dota?limit=${limit}&page=${page}`,
    {
      headers: {
        Cookie: cookieStore.toString()
      }
    }
  )

  return response.json()
}