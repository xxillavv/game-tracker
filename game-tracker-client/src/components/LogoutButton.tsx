"use client";

import { useAuth } from "@/hooks/useAuth";
import { Button } from "./ui/button";

export const LogoutButton = ({ children }: { children: React.ReactNode }) => {
  const { logout } = useAuth();

  return <Button onClick={() => logout.mutate()}>{children}</Button>;
};
