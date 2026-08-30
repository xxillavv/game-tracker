import { IAuthUserResponse, ILoginUser, IRegisterUser } from "@/types/auth.types";
import axios from "axios";

export const loginUser = async (body: ILoginUser) => {
  const { data } = await axios.post<IAuthUserResponse>(
    'http://localhost:3001/api/auth/login',
    body,
    {
      withCredentials: true
    }
  );

  return data;
}

export const registerUser = async (body: IRegisterUser) => {
  const { data } = await axios.post<IAuthUserResponse>(
    'http://localhost:3001/api/auth/register',
    body,
    {
      withCredentials: true
    }
  );

  return data;
}

export const logoutUser = async () => {
  const { data } = await axios.post(
    'http://localhost:3001/api/auth/logout',
    null,
    {
      withCredentials: true
    }
  )

  return data
}