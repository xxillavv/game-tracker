"use client";

import { Camera } from "lucide-react";

const EditAvatarButton = () => {

  return (
    <label className="absolute bottom-0 right-0 flex size-8 cursor-pointer items-center justify-center rounded-full bg-turquoise text-black shadow-md transition-transform hover:scale-110 hover:bg-turquoise">
      <input
        type="file"
        accept="image/jpeg, image/png, image/webp, image/heic"
        className="sr-only"
      />

      <Camera className="size-4 pointer-events-none" />
    </label>
  );
};

export default EditAvatarButton;
