import { IAuthUserResponse, ILoginUser, IRegisterUser } from "@/types/auth.types";
import axios from "axios";

export const loginUser = async (body: ILoginUser) => {
  const { data } = await axios.post<IAuthUserResponse>(
    `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
    body,
    {
      withCredentials: true
    }
  );

  return data;
}

export const registerUser = async (body: IRegisterUser) => {
  const { data } = await axios.post<IAuthUserResponse>(
    `${process.env.NEXT_PUBLIC_API_URL}/auth/register`,
    body,
    {
      withCredentials: true
    }
  );

  return data;
}

export const logoutUser = async () => {
  const { data } = await axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}/auth/logout`,
    null,
    {
      withCredentials: true
    }
  )

  return data
}