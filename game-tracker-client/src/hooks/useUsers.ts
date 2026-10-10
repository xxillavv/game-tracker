import { editUserProfile, uploadFunc } from "@/api/user.api"
import { IEditUserBody } from "@/types/user.types"
import { useMutation } from "@tanstack/react-query"
import { AxiosError, AxiosResponse } from "axios"
import { useRouter } from "next/navigation"

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