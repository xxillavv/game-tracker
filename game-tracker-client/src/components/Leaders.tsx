import { getLeaderboardData } from "@/app/queries";
import {
  Crown,
  Flame,
  Gamepad2,
  Medal,
  Shield,
  Swords,
  Target,
  TrendingUp,
  Trophy,
  Zap,
} from "lucide-react";


const POSITIONS: Record<string, { label: string; icon: typeof Shield }> = {
  carry: { label: "Carry", icon: Swords },
  mid: { label: "Mid", icon: Target },
  offlane: { label: "Offlane", icon: Shield },
  support: { label: "Support", icon: Zap },
  "hard-support": { label: "Hard Support", icon: Zap },
};

interface ProPlayer {
  rank: number;
  nickname: string;
  team: string;
  position: keyof typeof POSITIONS;
  mmr: number;
  winrate: number;
  streak: number;
  signature: string;
}

const PRO_PLAYERS: ProPlayer[] = [
  {
    rank: 1,
    nickname: "Yatoro",
    team: "Team Spirit",
    position: "carry",
    mmr: 12847,
    winrate: 68.4,
    streak: 14,
    signature: "Terrorblade",
  },
  {
    rank: 2,
    nickname: "Collapse",
    team: "Team Spirit",
    position: "offlane",
    mmr: 12612,
    winrate: 66.1,
    streak: 9,
    signature: "Mars",
  },
  {
    rank: 3,
    nickname: "Nisha",
    team: "Team Falcons",
    position: "mid",
    mmr: 12534,
    winrate: 65.8,
    streak: 11,
    signature: "Lina",
  },
  {
    rank: 4,
    nickname: "Ame",
    team: "Xtreme Gaming",
    position: "carry",
    mmr: 12401,
    winrate: 64.2,
    streak: 7,
    signature: "Faceless Void",
  },
  {
    rank: 5,
    nickname: "33",
    team: "Tundra Esports",
    position: "offlane",
    mmr: 12289,
    winrate: 63.7,
    streak: 6,
    signature: "Broodmother",
  },
  {
    rank: 6,
    nickname: "Topson",
    team: "Tundra Esports",
    position: "mid",
    mmr: 12150,
    winrate: 62.9,
    streak: 8,
    signature: "Invoker",
  },
  {
    rank: 7,
    nickname: "Miposhka",
    team: "Team Spirit",
    position: "hard-support",
    mmr: 11987,
    winrate: 61.5,
    streak: 5,
    signature: "Bane",
  },
  {
    rank: 8,
    nickname: "Cr1t-",
    team: "Gaimin Gladiators",
    position: "support",
    mmr: 11843,
    winrate: 60.8,
    streak: 4,
    signature: "Earth Spirit",
  },
];

function RankBadge({ rank }: { rank: number }) {
  if (rank === 1) {
    return (
      <div className="flex size-10 items-center justify-center rounded-xl bg-amber-400/15 ring-1 ring-amber-400/30">
        <Crown className="size-5 text-amber-400" />
      </div>
    );
  }
  if (rank === 2) {
    return (
      <div className="flex size-10 items-center justify-center rounded-xl bg-slate-300/10 ring-1 ring-slate-300/25">
        <Medal className="size-5 text-slate-300" />
      </div>
    );
  }
  if (rank === 3) {
    return (
      <div className="flex size-10 items-center justify-center rounded-xl bg-orange-400/10 ring-1 ring-orange-400/25">
        <Medal className="size-5 text-orange-400" />
      </div>
    );
  }
  return (
    <div className="flex size-10 items-center justify-center rounded-xl bg-white/5 ring-1 ring-white/10">
      <span className="text-sm font-bold text-white/50">#{rank}</span>
    </div>
  );
}

export async function Leaders() {
  const leaderboard = await getLeaderboardData(10)

  console.log(leaderboard)


  return (
    <section className="container mx-auto font-mono mb-60">
      <div className="flex flex-col items-center">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-turquoise/10 px-4 py-1.5 text-sm text-turquoise ring-1 ring-turquoise/20">
          <Trophy className="size-3.5" />
          Топ рейтинг
        </div>

        <h2 className="text-4xl font-bold tracking-tight text-white">
          Лідери <span className="text-turquoise">Dota 2</span>
        </h2>
        <p className="mt-3 max-w-lg text-center text-base text-white/50">
          Найкращі про-гравці за MMR рейтингом. Статистика оновлюється в
          реальному часі.
        </p>

        {/* Leaderboard table */}
        <div className="mt-12 w-full max-w-4xl">
          {/* Table header */}
          <div className="mb-3 grid grid-cols-[3rem_1fr_1fr_7rem_6rem_6rem] items-center gap-4 px-6 text-xs font-semibold uppercase tracking-wider text-white/30">
            <span>#</span>
            <span>Гравець</span>
            <span>Позиція</span>
            <span className="text-right">MMR</span>
            <span className="text-right">Winrate</span>
            <span className="text-right">Серія</span>
          </div>

          {/* Player rows */}
          <div className="flex flex-col gap-2">
            {PRO_PLAYERS.map((player) => {
              const pos = POSITIONS[player.position];
              const PosIcon = pos.icon;

              return (
                <div
                  key={player.nickname}
                  className="group grid grid-cols-[3rem_1fr_1fr_7rem_6rem_6rem] items-center gap-4 rounded-2xl bg-dark-blue/60 px-6 py-4 ring-1 ring-white/5 transition-all hover:bg-dark-blue/80 hover:ring-turquoise/20"
                >
                  {/* Rank */}
                  <RankBadge rank={player.rank} />

                  {/* Player info */}
                  <div className="flex flex-col">
                    <span className="text-base font-semibold text-white transition-colors group-hover:text-turquoise">
                      {player.nickname}
                    </span>
                    <span className="text-xs text-white/40">{player.team}</span>
                  </div>

                  {/* Position */}
                  <div className="flex items-center gap-2">
                    <div className="rounded-lg bg-turquoise/10 p-1.5">
                      <PosIcon className="size-3.5 text-turquoise" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm text-white/70">
                        {pos.label}
                      </span>
                      <span className="text-xs text-white/30">
                        {player.signature}
                      </span>
                    </div>
                  </div>

                  {/* MMR */}
                  <div className="text-right">
                    <span className="text-base font-bold tabular-nums text-white">
                      {player.mmr.toLocaleString()}
                    </span>
                  </div>

                  {/* Winrate */}
                  <div className="flex flex-col items-end gap-1">
                    <span className="text-sm font-semibold tabular-nums text-turquoise">
                      {player.winrate}%
                    </span>
                    <div className="h-1 w-full overflow-hidden rounded-full bg-white/5">
                      <div
                        className="h-full rounded-full bg-turquoise/60 transition-all"
                        style={{ width: `${player.winrate}%` }}
                      />
                    </div>
                  </div>

                  {/* Streak */}
                  <div className="flex items-center justify-end gap-1.5">
                    <Flame className="size-3.5 text-orange-400" />
                    <span className="text-sm font-semibold tabular-nums text-orange-400">
                      {player.streak}W
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom stats */}
        <div className="mt-10 grid w-full max-w-4xl grid-cols-3 gap-4">
          <div className="rounded-2xl bg-dark-blue/40 p-5 ring-1 ring-white/5 transition-all hover:ring-turquoise/20">
            <div className="mb-2 flex items-center gap-2">
              <div className="rounded-lg bg-turquoise/10 p-2">
                <Gamepad2 className="size-4 text-turquoise" />
              </div>
              <span className="text-xs font-medium uppercase tracking-wider text-white/40">
                Середній MMR
              </span>
            </div>
            <p className="text-2xl font-bold tabular-nums text-white">
              12,208
            </p>
          </div>

          <div className="rounded-2xl bg-dark-blue/40 p-5 ring-1 ring-white/5 transition-all hover:ring-turquoise/20">
            <div className="mb-2 flex items-center gap-2">
              <div className="rounded-lg bg-turquoise/10 p-2">
                <TrendingUp className="size-4 text-turquoise" />
              </div>
              <span className="text-xs font-medium uppercase tracking-wider text-white/40">
                Середній Winrate
              </span>
            </div>
            <p className="text-2xl font-bold tabular-nums text-white">
              64.2<span className="text-lg text-white/40">%</span>
            </p>
          </div>

          <div className="rounded-2xl bg-dark-blue/40 p-5 ring-1 ring-white/5 transition-all hover:ring-turquoise/20">
            <div className="mb-2 flex items-center gap-2">
              <div className="rounded-lg bg-turquoise/10 p-2">
                <Flame className="size-4 text-orange-400" />
              </div>
              <span className="text-xs font-medium uppercase tracking-wider text-white/40">
                Найдовша серія
              </span>
            </div>
            <p className="text-2xl font-bold text-white">
              14<span className="text-lg text-white/40"> перемог</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
