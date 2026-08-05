import { IAuthUserResponse, ILoginUser, IRegisterUser } from "@/types/auth.types"
import { useMutation } from "@tanstack/react-query"
import axios from "axios"

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

export const useAuth = () => {
  const loginMutation = useMutation({
    mutationKey: ['login'],
    mutationFn: (body: ILoginUser) => loginUser(body)
  })

  const registerMutation = useMutation({
    mutationKey: ['register'],
    mutationFn: (body: IRegisterUser) => registerUser(body),
  })


  return {
    login: loginMutation,
    register: registerMutation
  }
}