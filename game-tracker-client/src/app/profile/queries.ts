import { ICreateConnectionResponse } from "@/types/connections.types";
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
  const response = await fetch("http://localhost:3001/api/users/me", {
    cache: "no-store",
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return response.json();
};

export const getUserConnections = async (): Promise<ICreateConnectionResponse[]> => {
  const response = await fetch("http://localhost:3001/api/connection", {
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