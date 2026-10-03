"use client";

import { RefreshCw } from "lucide-react";
import { Button } from "./ui/button";
import { useLeaderboard } from "@/hooks/useLeaderboard";
import { Spinner } from "./ui/spinner";

const LeaderboardSyncButton = () => {
  const { syncLeaderboard } = useLeaderboard();

  return (
    <div className="flex items-center gap-4">
      {syncLeaderboard.isError && (
        <p className="text-sm font-medium text-red-400 bg-red-950/30 border border-red-900/50 rounded-lg px-3 py-2 transition-all">
          {syncLeaderboard.error.response?.data.message ??
            "Не вдалося синхронізувати лідерборд"}
        </p>
      )}
      <Button
        type="button"
        disabled={syncLeaderboard.isPending}
        onClick={() => syncLeaderboard.mutate()}
        className="flex items-center gap-2 rounded-xl bg-turquoise/10 px-4 py-2 text-xs font-semibold text-turquoise ring-1 ring-turquoise/20 transition-all hover:bg-turquoise/20"
      >
        {syncLeaderboard.isPending ? (
          <Spinner />
        ) : (
          <RefreshCw className="size-3.5" />
        )}
        Синхронізувати
      </Button>
    </div>
  );
};

export default LeaderboardSyncButton;
