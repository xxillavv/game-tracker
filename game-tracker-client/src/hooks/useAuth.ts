import { IAuthUserResponse, ILoginUser, IRegisterUser } from "@/types/auth.types"
import { useMutation } from "@tanstack/react-query"
import axios, { AxiosError } from "axios"
import { redirect } from "next/navigation";

const loginUser = async (body: ILoginUser) => {
  const { data } = await axios.post<IAuthUserResponse>(
    'http://localhost:3001/api/auth/login',
    body,
    {
      withCredentials: true
    }
  );

  return data;
}

const registerUser = async (body: IRegisterUser) => {
  const { data } = await axios.post<IAuthUserResponse>(
    'http://localhost:3001/api/auth/register',
    body,
    {
      withCredentials: true
    }
  );

  return data;
}


export interface IAxiosResponseError {
  statusCode: number;
  message: string[];
  error: string;
}

export const useAuth = () => {
  const loginMutation = useMutation<IAuthUserResponse, AxiosError<IAxiosResponseError>, ILoginUser>({
    mutationKey: ['login'],
    mutationFn: (body) => loginUser(body),
    onSuccess: () => {
      redirect('/profile')
    }
  })

  const registerMutation = useMutation<IAuthUserResponse, AxiosError<IAxiosResponseError>, IRegisterUser>({
    mutationKey: ['register'],
    mutationFn: (body) => registerUser(body),
    onSuccess: () => {
      redirect('/profile')
    }
  })


  return {
    login: loginMutation,
    register: registerMutation
  }
}