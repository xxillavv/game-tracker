import { getLeaderboardData } from "@/app/queries";
import { Crown, Gamepad2, Medal, Trophy, Users } from "lucide-react";

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
  const leaderboard = await getLeaderboardData(1);

  const uniqueTeams = new Set(
    leaderboard.data.map((el) => el.teamName).filter(Boolean),
  );

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

        <div className="mt-12 w-full max-w-4xl">
          <div className="mb-3 flex items-center gap-4 px-6 text-xs font-semibold uppercase tracking-wider text-white/30">
            <span className="w-12 shrink-0">#</span>
            <span className="flex-1">Гравець</span>
            <span className="flex-1">Команда</span>
          </div>

          <div className="flex flex-col gap-2">
            {leaderboard.data.map((player) => (
              <div
                key={player.leaderboardId}
                className="group flex items-center gap-4 rounded-2xl bg-dark-blue/60 px-6 py-4 ring-1 ring-white/5 transition-all hover:bg-dark-blue/80 hover:ring-turquoise/20"
              >
                <div className="w-12 shrink-0">
                  <RankBadge rank={player.playerRank} />
                </div>

                <div className="flex flex-1 flex-col">
                  <span className="text-base font-semibold text-white transition-colors group-hover:text-turquoise">
                    {player.username}
                  </span>
                </div>

                <div className="flex flex-1 items-center gap-2">
                  <div className="rounded-lg bg-turquoise/10 p-1.5">
                    <Users className="size-3.5 text-turquoise" />
                  </div>
                  <span className="text-sm text-white/70">
                    {player.teamName || "—"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10 flex w-full max-w-4xl flex-col gap-4 sm:flex-row">
          <div className="flex-1 rounded-2xl bg-dark-blue/40 p-5 ring-1 ring-white/5 transition-all hover:ring-turquoise/20">
            <div className="mb-2 flex items-center gap-2">
              <div className="rounded-lg bg-turquoise/10 p-2">
                <Gamepad2 className="size-4 text-turquoise" />
              </div>
              <span className="text-xs font-medium uppercase tracking-wider text-white/40">
                Гравців у рейтингу
              </span>
            </div>
            <p className="text-2xl font-bold tabular-nums text-white">
              {leaderboard.data.length}
            </p>
          </div>

          <div className="flex-1 rounded-2xl bg-dark-blue/40 p-5 ring-1 ring-white/5 transition-all hover:ring-turquoise/20">
            <div className="mb-2 flex items-center gap-2">
              <div className="rounded-lg bg-turquoise/10 p-2">
                <Users className="size-4 text-turquoise" />
              </div>
              <span className="text-xs font-medium uppercase tracking-wider text-white/40">
                Команд представлено
              </span>
            </div>
            <p className="text-2xl font-bold tabular-nums text-white">
              {uniqueTeams.size}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
