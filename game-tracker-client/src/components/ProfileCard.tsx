"use client";

import { useAuth } from "@/hooks/useAuth";
import { IUser } from "@/types/user.types";
import { Camera, LogOut, Pencil, User } from "lucide-react";
import Image from "next/image";
import Loading from "@/app/loading";
import { LogoutButton } from "./LogoutButton";
import ProfileEditButton from "./ProfileEditButton";

interface ProfileCardProps {
  user: IUser;
}

export const ProfileCard = ({ user }: ProfileCardProps) => {
  const { logout } = useAuth();

  if (logout.isPending) {
    return <Loading />;
  }

  return (
    <section className="container mx-auto flex justify-center font-mono">
      <div className="w-full max-w-md rounded-2xl bg-dark-blue/60 p-8 ring-1 ring-white/5">
        <div className="flex flex-col items-center gap-6">
          <div className="group relative">
            <div className="size-24 overflow-hidden rounded-full ring-2 ring-turquoise/30">
              {user.avatarUrl ? (
                <Image
                  src={user.avatarUrl}
                  alt={user.username}
                  width={96}
                  height={96}
                  className="size-full object-cover"
                />
              ) : (
                <div className="flex size-full items-center justify-center bg-dark-blue">
                  <User className="size-10 text-white/30" />
                </div>
              )}
            </div>

            <button
              type="button"
              className="absolute bottom-0 right-0 flex size-8 items-center justify-center rounded-full bg-turquoise text-black transition-transform hover:scale-110"
            >
              <Camera className="size-4" />
            </button>
          </div>

          <div className="flex flex-col items-center gap-1">
            <h2 className="text-xl font-bold text-white">{user.username}</h2>
            <span className="text-sm text-white/40">{user.email}</span>
          </div>

          <div className="flex w-full flex-col gap-3">
            <ProfileEditButton />
            <LogoutButton />
          </div>
        </div>
      </div>
    </section>
  );
};
