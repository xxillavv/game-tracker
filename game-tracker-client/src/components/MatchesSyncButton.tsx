"use client";

import { useMatches } from "@/hooks/useMatches";
import SyncButton from "./SyncButton";

const MatchesSyncButton = () => {
  const { syncMatches } = useMatches();

  return (
    <SyncButton
      mutation={syncMatches}
      errorMessage="Не вдалося синхронізувати матчі"
    />
  );
};

export default MatchesSyncButton;
