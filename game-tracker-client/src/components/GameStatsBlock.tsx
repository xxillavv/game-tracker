import {
  TrendingUp,
  Target,
  Gamepad2,
  Lock,
  BarChart3,
  RefreshCw,
  Crown,
  Trophy,
  Skull,
  SearchX,
} from "lucide-react";
import { Button } from "./ui/button";
import { getUserDotaStats } from "@/app/profile/queries";

const GameStatsBlock = async () => {
  const result = await getUserDotaStats();
  const isError = typeof result === "number";
  const meta = !isError ? result.metadata : null;

  const totalMatches = meta ? meta.matchesWin + meta.matchesLose : 0;
  const winrate = totalMatches > 0
    ? ((meta!.matchesWin / totalMatches) * 100).toFixed(1)
    : "0";

  const RANK_NAMES: Record<number, string> = {
    1: "Herald",
    2: "Guardian",
    3: "Crusader",
    4: "Archon",
    5: "Legend",
    6: "Ancient",
    7: "Divine",
    8: "Immortal",
  };

  const rankTier = meta ? Math.floor(meta.rank / 10) : 0;
  const rankStar = meta ? meta.rank % 10 : 0;
  const rankName = RANK_NAMES[rankTier] ?? "Unranked";
  const rankDisplay = rankTier > 0
    ? `${rankName} ${rankStar > 0 ? rankStar : ""}`
    : "Unranked";

  return (
    <div className="rounded-2xl bg-dark-blue/60 p-8 ring-1 ring-white/5 mb-20">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
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
        <Button
          type="button"
          className="flex items-center gap-2 rounded-xl bg-turquoise/10 px-4 py-2 text-xs font-semibold text-turquoise ring-1 ring-turquoise/20 transition-all hover:bg-turquoise/20"
        >
          <RefreshCw className="size-3.5" />
          Синхронізувати
        </Button>
      </div>

      {meta ? (
        <>
          <div className="mt-5 flex items-center gap-3 rounded-xl bg-background/40 px-5 py-3.5 ring-1 ring-white/5">
            <div className="flex size-10 items-center justify-center rounded-xl bg-turquoise/10 ring-1 ring-turquoise/20">
              <Crown className="size-5 text-turquoise" />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-bold text-white">{meta.name}</span>
              <span className="text-xs text-white/40">
                ID: {meta.accountId}
              </span>
            </div>
            {meta.dotaPlus && (
              <span className="ml-auto rounded-full bg-yellow-500/10 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-yellow-400 ring-1 ring-yellow-500/20">
                Dota Plus
              </span>
            )}
          </div>

          <div className="mt-4 flex flex-wrap gap-4">
            <div className="flex-1 basis-[calc(50%-0.5rem)] lg:basis-0 rounded-xl bg-background/40 p-5 ring-1 ring-white/5 transition-all hover:ring-white/10">
              <div className="mb-3 flex items-center gap-2">
                <div className="rounded-lg bg-turquoise/10 p-2">
                  <TrendingUp className="size-4 text-turquoise" />
                </div>
                <span className="text-xs font-medium uppercase tracking-wider text-white/40">
                  Ранг
                </span>
              </div>
              <p className="text-2xl font-bold text-white">{rankDisplay}</p>
            </div>

            <div className="flex-1 basis-[calc(50%-0.5rem)] lg:basis-0 rounded-xl bg-background/40 p-5 ring-1 ring-white/5 transition-all hover:ring-white/10">
              <div className="mb-3 flex items-center gap-2">
                <div className="rounded-lg bg-turquoise/10 p-2">
                  <Target className="size-4 text-turquoise" />
                </div>
                <span className="text-xs font-medium uppercase tracking-wider text-white/40">
                  Вінрейт
                </span>
              </div>
              <p className="text-2xl font-bold tabular-nums text-white">
                {winrate}
                <span className="text-base font-medium text-white/40">%</span>
              </p>
            </div>

            <div className="flex-1 basis-[calc(50%-0.5rem)] lg:basis-0 rounded-xl bg-background/40 p-5 ring-1 ring-white/5 transition-all hover:ring-white/10">
              <div className="mb-3 flex items-center gap-2">
                <div className="rounded-lg bg-turquoise/10 p-2">
                  <Gamepad2 className="size-4 text-turquoise" />
                </div>
                <span className="text-xs font-medium uppercase tracking-wider text-white/40">
                  Всього матчів
                </span>
              </div>
              <p className="text-2xl font-bold tabular-nums text-white">
                {totalMatches.toLocaleString("uk-UA")}
              </p>
            </div>

            <div className="flex-1 basis-[calc(50%-0.5rem)] lg:basis-0 rounded-xl bg-background/40 p-5 ring-1 ring-white/5 transition-all hover:ring-white/10">
              <div className="mb-3 flex items-center gap-2">
                <div className="rounded-lg bg-emerald-500/10 p-2">
                  <Trophy className="size-4 text-emerald-400" />
                </div>
                <span className="text-xs font-medium uppercase tracking-wider text-white/40">
                  Перемоги
                </span>
              </div>
              <p className="text-2xl font-bold tabular-nums text-emerald-400">
                {meta.matchesWin.toLocaleString("uk-UA")}
              </p>
            </div>

            <div className="flex-1 basis-[calc(50%-0.5rem)] lg:basis-0 rounded-xl bg-background/40 p-5 ring-1 ring-white/5 transition-all hover:ring-white/10">
              <div className="mb-3 flex items-center gap-2">
                <div className="rounded-lg bg-red-500/10 p-2">
                  <Skull className="size-4 text-red-400" />
                </div>
                <span className="text-xs font-medium uppercase tracking-wider text-white/40">
                  Поразки
                </span>
              </div>
              <p className="text-2xl font-bold tabular-nums text-red-400">
                {meta.matchesLose.toLocaleString("uk-UA")}
              </p>
            </div>
          </div>
        </>
      ) : isError && result === 404 ? (
        <div className="mt-6 flex flex-col items-center justify-center gap-2 rounded-xl bg-background/40 p-10 ring-1 ring-white/5">
          <SearchX className="size-8 text-white/15" />
          <p className="mt-1 text-4xl font-black tabular-nums tracking-tight text-white/20">
            404
          </p>
          <p className="text-sm text-white/40">
            Акаунт не знайдено
          </p>
          <p className="text-xs text-white/20">
            Перевірте правильність вашого Steam ID та спробуйте ще раз
          </p>
        </div>
      ) : (
        <div className="mt-6 flex items-center justify-center gap-3 rounded-xl bg-background/40 p-6 ring-1 ring-white/5">
          <BarChart3 className="size-5 text-white/20" />
          <p className="text-sm text-white/30">
            Прив'яжіть Dota 2 акаунт, щоб побачити вашу статистику
          </p>
        </div>
      )}
    </div>
  );
};

export default GameStatsBlock;
