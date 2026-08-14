"use client";

import { useUsers } from "@/hooks/useUsers";
import { Camera } from "lucide-react";
const EditAvatarButton = () => {
  const { uploadAvatar } = useUsers();

  return (
    <label className="absolute bottom-0 right-0 flex size-8 cursor-pointer items-center justify-center rounded-full bg-turquoise text-black shadow-md transition-transform hover:scale-110 hover:bg-turquoise">
      <input
        type="file"
        accept="image/jpeg, image/png, image/webp, image/heic"
        className="sr-only"
        onChange={(e) =>
          e.target.files?.[0] && uploadAvatar.mutate(e.target.files?.[0])
        }
      />

      <Camera className="size-4 pointer-events-none" />
    </label>
  );
};

export default EditAvatarButton;
