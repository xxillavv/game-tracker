import {
  TrendingUp,
  Target,
  Gamepad2,
  Lock,
  BarChart3,
  Crown,
  Trophy,
  Skull,
  SearchX,
} from "lucide-react";
import { getUserDotaStats } from "@/app/profile/queries";
import { rankNames } from "@/app/profile/constants";
import StatsSyncButton from "./StatsSyncButton";

const GameStatsBlock = async () => {
  const userStats = await getUserDotaStats();
  const metadata = typeof userStats === "number" ? null : userStats.metadata;

  const totalMatches = metadata
    ? metadata.matchesWin + metadata.matchesLose
    : 0;

  const winrate =
    totalMatches > 0
      ? ((metadata!.matchesWin / totalMatches) * 100).toFixed(1)
      : "0";

  const rankTier = metadata?.rank ? Math.floor(metadata.rank / 10) : 0;
  const rankStar = metadata ? metadata.rank % 10 : 0;
  const rankName = rankNames[rankTier] ?? "Unranked";
  const rankDisplay =
    rankTier > 0 ? `${rankName} ${rankStar > 0 ? rankStar : ""}` : "Unranked";

  return (
    <div className="mb-12 rounded-2xl bg-dark-blue/60 p-5 ring-1 ring-white/5 sm:mb-20 sm:p-8">
      <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            className="flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-semibold transition-all bg-turquoise/10 text-turquoise ring-1 ring-turquoise/2"
          >
            Dota 2
          </button>
          <button
            type="button"
            disabled
            className="flex items-center gap-1.5 rounded-full bg-white/5 px-4 py-1.5 text-xs font-semibold text-white/20 cursor-not-allowed"
          >
            <Lock className="size-3" />
            Brawl Stars
          </button>
          <button
            type="button"
            disabled
            className="flex items-center gap-1.5 rounded-full bg-white/5 px-4 py-1.5 text-xs font-semibold text-white/20 cursor-not-allowed"
          >
            <Lock className="size-3" />
            Valorant
          </button>
        </div>
        {metadata && <StatsSyncButton />}
      </div>
      {metadata ? (
        <>
          <div className="mt-5 flex items-center gap-3 rounded-xl bg-background/40 px-4 py-3.5 ring-1 ring-white/5 sm:px-5">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-turquoise/10 ring-1 ring-turquoise/20">
              <Crown className="size-5 text-turquoise" />
            </div>
            <div className="flex min-w-0 flex-col">
              <span className="truncate text-sm font-bold text-white">
                {metadata.name}
              </span>
              <span className="text-xs text-white/40">
                ID: {metadata.accountId}
              </span>
            </div>
            {metadata.dotaPlus && (
              <span className="ml-auto shrink-0 rounded-full bg-yellow-500/10 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-yellow-400 ring-1 ring-yellow-500/20">
                Dota Plus
              </span>
            )}
          </div>
          <div className="mt-4 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-5">
            <div className="col-span-2 rounded-xl bg-background/40 p-4 ring-1 ring-white/5 transition-all hover:ring-white/10 sm:p-5 lg:col-span-1">
              <div className="mb-3 flex items-center gap-2">
                <div className="rounded-lg bg-turquoise/10 p-2">
                  <TrendingUp className="size-4 text-turquoise" />
                </div>
                <span className="text-xs font-medium uppercase tracking-wider text-white/40">
                  Ранг
                </span>
              </div>
              <p className="text-xl font-bold sm:text-2xl text-white">{rankDisplay}</p>
            </div>
            <div className="rounded-xl bg-background/40 p-4 ring-1 ring-white/5 transition-all hover:ring-white/10 sm:p-5">
              <div className="mb-3 flex items-center gap-2">
                <div className="rounded-lg bg-turquoise/10 p-2">
                  <Target className="size-4 text-turquoise" />
                </div>
                <span className="text-xs font-medium uppercase tracking-wider text-white/40">
                  Вінрейт
                </span>
              </div>
              <p className="text-xl font-bold sm:text-2xl tabular-nums text-white">
                {winrate}
                <span className="text-base font-medium text-white/40">%</span>
              </p>
            </div>
            <div className="rounded-xl bg-background/40 p-4 ring-1 ring-white/5 transition-all hover:ring-white/10 sm:p-5">
              <div className="mb-3 flex items-center gap-2">
                <div className="rounded-lg bg-turquoise/10 p-2">
                  <Gamepad2 className="size-4 text-turquoise" />
                </div>
                <span className="text-xs font-medium uppercase tracking-wider text-white/40">
                  Всього матчів
                </span>
              </div>
              <p className="text-xl font-bold sm:text-2xl tabular-nums text-white">
                {totalMatches.toLocaleString("uk-UA")}
              </p>
            </div>
            <div className="rounded-xl bg-background/40 p-4 ring-1 ring-white/5 transition-all hover:ring-white/10 sm:p-5">
              <div className="mb-3 flex items-center gap-2">
                <div className="rounded-lg bg-emerald-500/10 p-2">
                  <Trophy className="size-4 text-emerald-400" />
                </div>
                <span className="text-xs font-medium uppercase tracking-wider text-white/40">
                  Перемоги
                </span>
              </div>
              <p className="text-xl font-bold sm:text-2xl tabular-nums text-emerald-400">
                {metadata.matchesWin.toLocaleString("uk-UA")}
              </p>
            </div>
            <div className="rounded-xl bg-background/40 p-4 ring-1 ring-white/5 transition-all hover:ring-white/10 sm:p-5">
              <div className="mb-3 flex items-center gap-2">
                <div className="rounded-lg bg-red-500/10 p-2">
                  <Skull className="size-4 text-red-400" />
                </div>
                <span className="text-xs font-medium uppercase tracking-wider text-white/40">
                  Поразки
                </span>
              </div>
              <p className="text-xl font-bold sm:text-2xl tabular-nums text-red-400">
                {metadata.matchesLose.toLocaleString("uk-UA")}
              </p>
            </div>
          </div>
        </>
      ) : typeof userStats === "number" ? (
        <div className="mt-6 flex flex-col items-center justify-center gap-2 rounded-xl bg-background/40 p-6 text-center ring-1 ring-white/5 sm:p-10">
          <SearchX className="size-8 text-white/15" />
          <p className="mt-1 text-4xl font-black tabular-nums tracking-tight text-white/20">
            404
          </p>
          <p className="text-sm text-white/40">Акаунт не знайдено</p>
          <p className="text-xs text-white/20">
            Перевірте правильність вашого Steam ID та спробуйте ще раз
          </p>
        </div>
      ) : (
        <div className="mt-6 flex items-center justify-center gap-3 rounded-xl bg-background/40 p-6 ring-1 ring-white/5">
          <BarChart3 className="size-5 text-white/20" />
          <p className="text-center text-sm text-white/30">
            {"Прив'яжіть"} Dota 2 акаунт, щоб побачити вашу статистику
          </p>
        </div>
      )}
    </div>
  );
};

export default GameStatsBlock;
