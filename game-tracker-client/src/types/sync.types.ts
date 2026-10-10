import { IAxiosResponseError } from "@/hooks/useAuth"
import { UseMutationResult } from "@tanstack/react-query"
import { AxiosError } from "axios"

export interface ISyncButtonProps {
  mutation: UseMutationResult<void, AxiosError<IAxiosResponseError>, void>
  errorMessage: string
}
