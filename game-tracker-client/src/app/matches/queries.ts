import { cookies } from "next/headers"

export const getUserMatches = async () => {
  const cookieStore = await cookies()

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/matches/dota`, {
    headers: {
      Cookie: cookieStore.toString()
    }
  })

  return response
}