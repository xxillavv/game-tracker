import { connectUserGameAccount, deleteConnection } from "@/api/connections.api"
import { ICreateConnectionBody } from "@/types/connections.types"
import { useMutation } from "@tanstack/react-query"
import { useRouter } from "next/navigation"

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