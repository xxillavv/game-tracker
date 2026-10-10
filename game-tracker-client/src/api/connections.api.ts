import { ICreateConnectionBody } from "@/types/connections.types"
import axios from "axios"

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