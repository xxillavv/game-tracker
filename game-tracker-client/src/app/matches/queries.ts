import { IGameMatchesResponse } from "@/types/matches.type"
import { cookies } from "next/headers"

export const getUserMatches = async (): Promise<IGameMatchesResponse[]> => {
  const cookieStore = await cookies()

  console.log(cookieStore)

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/matches/dota`, {
    headers: {
      Cookie: cookieStore.toString()
    }
  })

  return response.json()
}