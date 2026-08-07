"use client";

import { useAuth } from "@/hooks/useAuth";
import { Button } from "./ui/button";
import Loading from "@/app/loading";

export const LogoutButton = ({ children }: { children: React.ReactNode }) => {
  const { logout } = useAuth();

  if (logout.isPending) {
    return <Loading />
  }

  return <Button onClick={() => logout.mutate()} disabled={logout.isPending}>{children}</Button>;
};
