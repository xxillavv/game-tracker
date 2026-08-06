import { IAuthUserResponse, ILoginUser, IRegisterUser } from "@/types/auth.types"
import { useMutation } from "@tanstack/react-query"
import axios, { AxiosError } from "axios"
import { useRouter } from "next/navigation"

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

const logoutUser = async () => {
  const { data } = await axios.post(
    'http://localhost:3001/api/auth/logout',
    {
      withCredentials: true
    }
  )

  return data
}


export interface IAxiosResponseError {
  statusCode: number;
  message: string[];
  error: string;
}

export const useAuth = () => {
  const router = useRouter()

  const loginMutation = useMutation<IAuthUserResponse, AxiosError<IAxiosResponseError>, ILoginUser>({
    mutationKey: ['login'],
    mutationFn: (body) => loginUser(body),
    onSuccess: () => {
      router.push('/profile')
    }
  })

  const registerMutation = useMutation<IAuthUserResponse, AxiosError<IAxiosResponseError>, IRegisterUser>({
    mutationKey: ['register'],
    mutationFn: (body) => registerUser(body),
    onSuccess: () => {
      router.push('/profile')
    }
  })

  const logoutMutation = useMutation<{ message: string }>({
    mutationKey: ['logout'],
    mutationFn: logoutUser,
    onSuccess: () => {
      router.push('/')
    }
  })


  return {
    login: loginMutation,
    register: registerMutation,
    logout: logoutMutation
  }
}