"use client";

import { useLeaderboard } from "@/hooks/useLeaderboard";
import SyncButton from "./SyncButton";

const LeaderboardSyncButton = () => {
  const { syncLeaderboard } = useLeaderboard();

  return (
    <SyncButton
      mutation={syncLeaderboard}
      errorMessage="Не вдалося синхронізувати лідерборд"
    />
  );
};

export default LeaderboardSyncButton;
