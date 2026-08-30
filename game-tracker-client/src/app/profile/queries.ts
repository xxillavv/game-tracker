import { ICreateConnectionBody, ICreateConnectionResponse } from "@/types/connections.types";
import { IDotaStatsResponse } from "@/types/stats.types";
import { IEditUserBody, IUser } from "@/types/user.types";
import axios from "axios";
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

export const syncStats = async () => {
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}/stats/dota/sync`,
    null,
    {
      withCredentials: true
    }
  )

  return response.data
}

export const uploadFunc = async (file: File) => {
  const formData = new FormData()
  formData.append('file', file)

  return axios.post(`${process.env.NEXT_PUBLIC_API_URL}/users/avatar`, formData, {
    withCredentials: true,
    headers: {
      "Content-Type": "multipart/form/data"
    },
  })
}

export const editUserProfile = async (body: IEditUserBody | undefined) => {
  return axios.patch(`${process.env.NEXT_PUBLIC_API_URL}/users`, body, {
    withCredentials: true
  })
}

export const connectUserGameAccount = async (body: ICreateConnectionBody) => {
  const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/connection`, body, {
    withCredentials: true
  })

  return response.data
}

export const deleteConnection = async (connectionId: number) => {
  return axios.delete(
    `${process.env.NEXT_PUBLIC_API_URL}/connection/${connectionId}`,
    {
      withCredentials: true
    }
  )
}