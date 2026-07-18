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


export interface IDotaMatches {
  match_id: number;
  player_slot: number;
  radiant_win: boolean;
  hero_id: number;
  start_time: number;
  duration: number;
  game_mode: number;
  lobby_type: number;
  version: number | null;
  kills: number;
  deaths: number;
  assists: number;
  average_rank: number;
  xp_per_min: number;
  gold_per_min: number;
  hero_damage: number;
  tower_damage: number;
  hero_healing: number;
  last_hits: number;
  lane: number | null;
  lane_role: number | null;
  is_roaming: boolean | null;
  cluster: number;
  leaver_status: number;
  party_size: number | null;
  hero_variant: number;
}