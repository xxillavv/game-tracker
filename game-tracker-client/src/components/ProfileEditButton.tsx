"use client";

import { Pencil, Check } from "lucide-react";
import { Button } from "./ui/button";
import { useUsers } from "@/hooks/useUsers";
import { useState } from "react";
import { Input } from "./ui/input";
import { IEditUserBody } from "@/types/user.types";

const ProfileEditButton = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [inputValues, setInputValues] = useState<IEditUserBody>();

  const { editUserProfile } = useUsers();

  return (
    <>
      {isOpen && (
        <div className="mt-3 flex flex-col gap-2">
          <Input
            placeholder="Введіть ваш email"
            onChange={(e) =>
              setInputValues({ ...inputValues, email: e.target.value })
            }
            className="h-9 w-full rounded-lg border-none bg-dark-blue/80 px-3 text-sm ring-1 ring-white/5 text-input-text placeholder:text-white/25 transition-all focus:ring-turquoise/30"
          />
          <Input
            placeholder="Введіть ваш username"
            onChange={(e) =>
              setInputValues({ ...inputValues, username: e.target.value })
            }
            className="h-9 w-full rounded-lg border-none bg-dark-blue/80 px-3 text-sm ring-1 ring-white/5 text-input-text placeholder:text-white/25 transition-all focus:ring-turquoise/30"
          />
          <Button
            type="button"
            onClick={() => {
              setIsOpen(false)
              return inputValues && editUserProfile.mutate(inputValues) 
            }}
            className="mt-1 flex w-full items-center justify-center gap-2 rounded-lg bg-turquoise/10 px-4 py-2 text-sm font-medium text-turquoise ring-1 ring-turquoise/20 transition-all hover:bg-turquoise/20"
          >
            <Check className="size-4" />
            Зберегти
          </Button>
        </div>
      )}
      <Button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex w-full items-center justify-center gap-2
      rounded-xl bg-turquoise/10 px-5 py-3 text-sm font-medium text-turquoise
      ring-1 ring-turquoise/20 transition-all hover:bg-turquoise/20"
      >
        <Pencil className="size-4" />
        Редагувати профіль
      </Button>
    </>
  );
};

export default ProfileEditButton;
