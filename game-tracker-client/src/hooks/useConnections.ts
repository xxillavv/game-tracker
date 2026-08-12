import { ICreateConnectionBody, ICreateConnectionResponse } from "@/types/connections.types"
import { useMutation } from "@tanstack/react-query"
import axios from "axios"


const connectUserGameAccount = async (body: ICreateConnectionBody) => {
  const response = await axios.post("http://localhost:3001/api/connection", body)

  return response.data
}

export const useConnections = () => {
  const createConnecctionMutation = useMutation({
    mutationKey: ["create-connection"],
    mutationFn: (body: ICreateConnectionBody) => connectUserGameAccount(body),
  })

  return {
    createConnection: createConnecctionMutation
  }
}