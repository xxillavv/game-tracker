import { IAuthUserResponse, ILoginUser, IRegisterUser } from "@/types/auth.types"
import { useMutation } from "@tanstack/react-query"
import axios from "axios"

const loginUser = async (body: ILoginUser) => {
  const { data } = await axios.post<IAuthUserResponse>(
    'http://localhost:3001/api/auth/login',
    body
  );

  return data;
}

const registerUser = async (body: IRegisterUser) => {
  const { data } = await axios.post<IAuthUserResponse>(
    'http://localhost:3001/api/auth/register',
    body
  );

  return data;
}

export const useAuth = () => {
  const { mutate: loginMutate } = useMutation({
    mutationKey: ['login'],
    mutationFn: (body: ILoginUser) => loginUser(body)
  })

  const { mutate: registerMutate } = useMutation({
    mutationKey: ['register'],
    mutationFn: (body: IRegisterUser) => registerUser(body),
  })


  return { loginMutate, registerMutate }
}