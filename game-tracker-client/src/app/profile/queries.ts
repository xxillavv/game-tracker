import { ICreateConnectionResponse } from "@/types/connections.types";
import { IDotaStatsResponse } from "@/types/stats.types";
import { IUser } from "@/types/user.types";
import { cookies } from "next/headers";

export const getUserDotaStats = async (): Promise<IDotaStatsResponse | number> => {
  const cookieStore = await cookies()

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/stats/dota`, {
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
  const cookieStore = await cookies()

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/me`, {
    cache: "no-store",
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return response.json();
};

export const getUserConnections = async (): Promise<ICreateConnectionResponse[]> => {
  const cookieStore = await cookies()

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/connection`, {
    headers: {
      Cookie: cookieStore.toString(),
    },
    cache: "no-store"
  });

  if (!response.ok) {
    return [];
  }

  return response.json();
};