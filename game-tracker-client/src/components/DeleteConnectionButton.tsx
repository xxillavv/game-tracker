"use client";

import { Unplug } from "lucide-react";
import { Button } from "./ui/button";
import { useConnections } from "@/hooks/useConnections";

const DeleteConnectionButton = ({ connectionId }: { connectionId: number }) => {
  const { deleteConnection } = useConnections();

  return (
    <Button
      type="button"
      onClick={() => deleteConnection.mutate(connectionId)}
      className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-red-500/10 text-red-400 ring-1 ring-red-500/20 transition-all hover:bg-red-500/20"
    >
      <Unplug className="size-4" />
    </Button>
  );
};

export default DeleteConnectionButton;
