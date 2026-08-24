type ILeaderboardData = {
  leaderboardId: number
  playerRank: number
  username: string
  teamName: string
  teamId: number
}

export interface ILeaderboardResponse {
  data: ILeaderboardData[]
  metadata: {
    currentPage: number
    totalCount: number
    totalPages: number
  }
}