import { User, Mail, Shield, CalendarDays, Sparkles } from "lucide-react";
import Image from "next/image";
import { LogoutButton } from "./LogoutButton";
import ProfileEditButton from "./ProfileEditButton";
import EditAvatarButton from "./EditAvatarButton";
import { getCurrentUser, getUserDotaStats } from "@/app/profile/queries";
import { averageDotaGameTime } from "@/app/profile/constants";

export const ProfileCard = async () => {
  const user = await getCurrentUser();
  const userGameStats = await getUserDotaStats();

  const metadata =
    typeof userGameStats === "number" ? null : userGameStats.metadata;

  return (
    <div className="rounded-2xl bg-dark-blue/60 ring-1 ring-white/5 h-full flex flex-col overflow-hidden max-w-100">
      <div className="px-8 py-8 flex flex-col flex-1">
        <div className="flex items-center gap-5">
          <div className="group relative shrink-0">
            <div className="size-24 overflow-hidden rounded-2xl ring-[3px] ring-dark-blue/80 shadow-lg shadow-black/30">
              {user.avatar ? (
                <Image
                  src={user.avatar}
                  alt="avatar"
                  loading="eager"
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
            <EditAvatarButton />
          </div>
          <div className="pb-1">
            <h2 className="text-xl font-bold text-white z-50">
              {user.username}
            </h2>
            <div className="mt-1 flex items-center gap-1.5 text-sm text-white/40">
              <Mail className="size-3.5" />
              <span>{user.email}</span>
            </div>
          </div>
        </div>
        <div className="mt-5 flex items-center gap-2">
          <span className="flex items-center gap-1.5 rounded-full bg-turquoise/10 px-3 py-1 text-xs font-medium text-turquoise ring-1 ring-turquoise/20">
            <Shield className="size-3" />
            Активний
          </span>
          <span className="flex items-center gap-1.5 rounded-full bg-white/5 px-3 py-1 text-xs font-medium text-white/40 ring-1 ring-white/5">
            <CalendarDays className="size-3" />
            Учасник
          </span>
        </div>
        <div className="mt-5 rounded-xl bg-background/40 p-4 ring-1 ring-white/5">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="size-3.5 text-turquoise/60" />
            <span className="text-xs font-semibold uppercase tracking-wider text-white/30">
              Активність
            </span>
          </div>
          <div className="flex gap-3">
            <div className="flex-1 text-center">
              <p className="text-lg font-bold tabular-nums text-white">
                {metadata ? metadata.matchesLose : "—"}
              </p>
              <p className="text-[10px] uppercase tracking-wider text-white/30">
                Програшів
              </p>
            </div>
            <div className="flex-1 text-center">
              <p className="text-lg font-bold tabular-nums text-white">
                {metadata ? metadata.matchesWin : "—"}
              </p>
              <p className="text-[10px] uppercase tracking-wider text-white/30">
                Перемог
              </p>
            </div>
            <div className="flex-1 text-center">
              <p className="text-lg font-bold tabular-nums text-white">
                {metadata
                  ? `~ ${Math.floor((metadata.matchesLose + metadata.matchesWin) * averageDotaGameTime)}`
                  : "—"}
              </p>
              <p className="text-[10px] uppercase tracking-wider text-white/30">
                Годин в іграх
              </p>
            </div>
          </div>
        </div>
        <div className="mt-auto flex flex-col gap-5">
          <ProfileEditButton />
          <LogoutButton />
        </div>
      </div>
    </div>
  );
};
