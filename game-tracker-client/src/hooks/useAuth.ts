import { loginUser, logoutUser, registerUser } from "@/api/auth.api";
import { IAuthUserResponse, ILoginUser, IRegisterUser } from "@/types/auth.types"
import { useMutation } from "@tanstack/react-query"
import { AxiosError } from "axios"

export interface IAxiosResponseError {
  statusCode: number;
  message: string[];
  error: string;
}

export const useAuth = () => {
  const loginMutation = useMutation<IAuthUserResponse, AxiosError<IAxiosResponseError>, ILoginUser>({
    mutationKey: ['login'],
    mutationFn: (body) => loginUser(body),
    onSuccess: async () => {
      await new Promise((resolve) => setTimeout(resolve, 400))
      window.location.href = "/profile"
    }
  })

  const registerMutation = useMutation<IAuthUserResponse, AxiosError<IAxiosResponseError>, IRegisterUser>({
    mutationKey: ['register'],
    mutationFn: (body) => registerUser(body),
    onSuccess: async () => {
      await new Promise((resolve) => setTimeout(resolve, 400))
      window.location.href = "/profile"
    }
  })

  const logoutMutation = useMutation<{ message: string }>({
    mutationKey: ['logout'],
    mutationFn: logoutUser,

    onSuccess: async () => {
      await new Promise((resolve) => setTimeout(resolve, 400))
      window.location.href = '/'
    }
  })

  return {
    login: loginMutation,
    register: registerMutation,
    logout: logoutMutation,
  }
}