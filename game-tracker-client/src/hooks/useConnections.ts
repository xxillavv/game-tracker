import { ICreateConnectionBody } from "@/types/connections.types"
import { useMutation } from "@tanstack/react-query"
import axios from "axios"
import { useRouter } from "next/navigation"


const connectUserGameAccount = async (body: ICreateConnectionBody) => {
  const response = await axios.post("http://localhost:3001/api/connection", body, {
    withCredentials: true
  })

  return response.data
}

const deleteConnection = async (connectionId: number) => {
  return axios.delete(
    `http://localhost:3001/api/connection/${connectionId}`,
    {
      withCredentials: true
    }
  )
}

export const useConnections = () => {
  const router = useRouter()

  const createConnecctionMutation = useMutation({
    mutationKey: ["create-connection"],
    mutationFn: (body: ICreateConnectionBody) => connectUserGameAccount(body),
    onSuccess: () => {
      router.refresh()
    }
  })

  const deleteConnectionMutation = useMutation({
    mutationKey: ["delete-connection"],
    mutationFn: (connectionId: number) => deleteConnection(connectionId),
    onSuccess: () => {
      router.refresh()
    }
  })

  return {
    createConnection: createConnecctionMutation,
    deleteConnection: deleteConnectionMutation
  }
}