"use client";

import { Pencil } from "lucide-react";
import { Button } from "./ui/button";

const ProfileEditButton = () => {
  return (
    <Button
      type="button"
      className="flex w-full items-center justify-center gap-2
      rounded-xl bg-turquoise/10 px-5 py-3 text-sm font-medium text-turquoise
      ring-1 ring-turquoise/20 transition-all hover:bg-turquoise/20"
    >
      <Pencil className="size-4" />
      Редагувати профіль
    </Button>
  );
};

export default ProfileEditButton;
