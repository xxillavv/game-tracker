export interface IGameMatchesMetadata {
  assists: number
  deaths: number
  duration: number
  goldPerMinute: number
  heroDamage: number 
  isRadiantWin: boolean
  kills: number
  matchId: number
  role: string | null
  towerDamage: number
}

export interface IGameMatchesResponse {
  matchId: number
  gameMatchId: number
  connectionMatchId: number
  metadata: IGameMatchesMetadata
}

export interface IMatchCardProps {
  match: IGameMatchesResponse
}