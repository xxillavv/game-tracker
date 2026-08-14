import { IDotaStatsResponse } from "@/types/stats.types";
import { IUser } from "@/types/user.types";
import { cookies } from "next/headers";

const cookieStore = await cookies()

export const getUserDotaStats = async (): Promise<IDotaStatsResponse | number> => {
  const response = await fetch("http://localhost:3001/api/stats/dota", {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });

  if (!response.ok) {
    return response.status;
  }

  return response.json();
};


export const getCurrentUser = async (): Promise<IUser> => {
  let response = await fetch("http://localhost:3001/api/users/me", {
    cache: "no-store",
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return response.json();
};