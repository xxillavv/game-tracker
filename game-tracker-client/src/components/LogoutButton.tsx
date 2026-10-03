"use client";

import { useAuth } from "@/hooks/useAuth";
import { Button } from "./ui/button";
import { LogOut } from "lucide-react";
import { Spinner } from "./ui/spinner";

export const LogoutButton = () => {
  const { logout } = useAuth();

  return (
    <Button
      type="button"
      onClick={() => logout.mutate()}
      disabled={logout.isPending}
      className="flex w-full items-center justify-center gap-2 rounded-xl bg-white/5 px-5 py-3 text-sm font-medium text-white/60 ring-1 ring-white/5 transition-all hover:bg-red-500/10 hover:text-red-400 hover:ring-red-500/20"
    >
      {logout.isPending ? <Spinner /> : <LogOut className="size-4" />}
      Вийти з аккаунта
    </Button>
  );
};
