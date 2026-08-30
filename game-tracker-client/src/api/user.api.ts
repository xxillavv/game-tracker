import { IEditUserBody } from "@/types/user.types"
import axios from "axios"

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