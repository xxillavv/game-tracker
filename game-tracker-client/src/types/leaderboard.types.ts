export interface ILeaderboardData {
  leaderboardId: number;
  playerRank: number;
  username: string;
  teamName: string;
  teamId: number;
}

export interface ILeaderboardMetadata {
  currentPage: number;
  totalCount: number;
  totalPages: number;
}

export interface ILeaderboardResponse {
  data: ILeaderboardData[];
  metadata: ILeaderboardMetadata;
}

export interface ILeaderCardProps {
  player: ILeaderboardData;
}