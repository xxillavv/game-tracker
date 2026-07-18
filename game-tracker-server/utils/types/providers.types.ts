export interface IDotaProfile {
  account_id: number;
  personaname: string;
  name: string | null;
  plus: boolean;
  cheese: number;
  steamid: string;
  avatar: string;
  avatarmedium: string;
  avatarfull: string;
  profileurl: string;
  last_login: string | null;
  loccountrycode: string | null;
  status: string | null;
  fh_unavailable: boolean;
  is_contributor: boolean;
  is_subscriber: boolean;
}

export interface IAlias {
  personaname: string;
  name_since: string;
}


export interface IDotaPlayerStatsResponse {
  profile: IDotaProfile;
  rank_tier: number | null;
  leaderboard_rank: number | null;
  computed_mmr: number | null;
  computed_mmr_turbo: number | null;
  aliases: IAlias[];
}


export interface IDotaWinrate {
  win: number
  lose: number
}


export interface IDotaRatings {
  time: string
  rank_tier: number
}