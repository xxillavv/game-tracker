"use client";

import { useStats } from "@/hooks/useStats";
import SyncButton from "./SyncButton";

const StatsSyncButton = () => {
  const { syncStats } = useStats();

  return (
    <SyncButton
      mutation={syncStats}
      errorMessage="Не вдалося синхронізувати статистику"
    />
  );
};

export default StatsSyncButton;
