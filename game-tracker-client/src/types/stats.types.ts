import { AxiosResponse } from "axios";

export interface IDotaStatsMetadata {
  name: string;
  rank: number;
  dotaPlus: boolean;
  accountId: number;
  matchesWin: number;
  matchesLose: number;
}

export interface IDotaStatsResponse {
  statId: number;
  statsConnectionId: number;
  metadata: IDotaStatsMetadata;
  createdAt: string;
  updatedAt: string;
}
