import { useMutation } from "@tanstack/react-query"
import axios, { AxiosError, AxiosResponse } from "axios"
import { useRouter } from "next/navigation"

const uploadFunc = async (file: File) => {
  const formData = new FormData()
  formData.append('file', file)

  return axios.post("http://localhost:3001/api/users/avatar", formData, {
    withCredentials: true,
    headers: {
      "Content-Type": "multipart/form/data"
    },
  })
}

export const useUsers = () => {
  const router = useRouter()

  const uploadAvatar = useMutation<AxiosResponse, AxiosError, File>({
    mutationKey: ["upload-avatar"],
    mutationFn: (file) => uploadFunc(file),
    onSuccess: () => {
      router.refresh()
    }
  })

  return {
    uploadAvatar
  }
}