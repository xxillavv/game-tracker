import { ILeaderboardResponse } from "@/types/leaderboard.types"
import { cookies } from "next/headers"

const cookieStore = await cookies()

export const getLeaderboardData = async (limit: number): Promise<ILeaderboardResponse[]> => {
  const response = await fetch(`http://localhost:3001/api/leaderboard/dota?limit=${limit}`,
    {
      headers: {
        Cookie: cookieStore.toString()
      }
    }
  )

  return response.json()
}