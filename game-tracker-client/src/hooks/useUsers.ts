import { IEditUserBody } from "@/types/user.types"
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

const editUserProfile = async (body: IEditUserBody) => {
  return axios.patch("http://localhost:3001/api/users", body, {
    withCredentials: true
  })
}

export const useUsers = () => {
  const router = useRouter()

  const uploadAvatarMutation = useMutation<AxiosResponse, AxiosError, File>({
    mutationKey: ["upload-avatar"],
    mutationFn: (file) => uploadFunc(file),
    onSuccess: () => {
      router.refresh()
    }
  })

  const editUserProfileMutation = useMutation({
    mutationKey: ['edit-user-profile'],
    mutationFn: (body: IEditUserBody) => editUserProfile(body),
    onSuccess: () => {
      router.refresh()
    }
  })

  return {
    uploadAvatar: uploadAvatarMutation,
    editUserProfile: editUserProfileMutation
  }
}