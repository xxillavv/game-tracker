import { Clock, Coins, Flame, Shield, Swords, Zap } from "lucide-react";
import { IMatchCardProps } from "@/types/matches.type";

function formatDuration(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, "0")}`;
}

export function MatchCard({ match }: IMatchCardProps) {
  const { metadata, gameMatchId } = match;
  const isWin = metadata.isRadiantWin;
  const kdaRatio = (
    (metadata.kills + metadata.assists) /
    Math.max(1, metadata.deaths)
  ).toFixed(2);

  return (
    <div
      className={`group relative overflow-hidden rounded-2xl bg-dark-blue/60 p-5 ring-1 transition-all duration-300 hover:bg-dark-blue/90 hover:scale-[1.005] ${
        isWin
          ? "ring-turquoise/20 hover:ring-turquoise/40 shadow-[0_4px_24px_rgba(0,228,184,0.05)]"
          : "ring-white/5 hover:ring-red-500/30 hover:shadow-[0_4px_24px_rgba(239,68,68,0.05)]"
      }`}
    >
      <div
        className={`pointer-events-none absolute top-0 right-0 h-28 w-28 rounded-bl-full bg-linear-to-bl transition-all duration-300 ${
          isWin
            ? "from-turquoise/10 group-hover:from-turquoise/20"
            : "from-red-500/5 group-hover:from-red-500/15"
        }`}
      />

      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap items-center gap-4 sm:flex-nowrap">
          <div
            className={`flex h-14 w-28 shrink-0 flex-col items-center justify-center rounded-xl font-mono text-xs font-bold ring-1 transition-all ${
              isWin
                ? "bg-turquoise/10 text-turquoise ring-turquoise/30 shadow-[0_0_15px_rgba(0,228,184,0.15)]"
                : "bg-red-500/10 text-red-400 ring-red-500/30 shadow-[0_0_15px_rgba(239,68,68,0.15)]"
            }`}
          >
            <span className="text-sm font-black tracking-wide uppercase">
              {isWin ? "Перемога" : "Поразка"}
            </span>
            <span className="text-[10px] font-medium opacity-70">
              {isWin ? "Radiant Win" : "Dire Win"}
            </span>
          </div>

          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="text-base font-bold text-white group-hover:text-turquoise transition-colors">
                Матч #{gameMatchId}
              </span>
              {metadata.role && (
                <span className="rounded-full bg-turquoise/10 px-2.5 py-0.5 text-[11px] font-semibold text-turquoise ring-1 ring-turquoise/20">
                  {metadata.role}
                </span>
              )}
            </div>

            <div className="mt-1 flex items-center gap-3 text-xs text-white/50">
              <div className="flex items-center gap-1.5">
                <Clock className="size-3.5 text-turquoise" />
                <span>{formatDuration(metadata.duration)}</span>
              </div>
              <span>•</span>
              <div className="flex items-center gap-1.5">
                <Zap className="size-3.5 text-amber-400" />
                <span>KDA: {kdaRatio}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3 sm:gap-4">
          <div className="flex items-center gap-2 rounded-xl bg-background/50 px-4 py-2.5 ring-1 ring-white/5">
            <div className="flex size-7 items-center justify-center rounded-lg bg-turquoise/10">
              <Swords className="size-4 text-turquoise" />
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] font-semibold uppercase tracking-wider text-white/40">
                K / D / A
              </span>
              <div className="flex items-center gap-1 text-sm font-bold tabular-nums">
                <span className="text-emerald-400">{metadata.kills}</span>
                <span className="text-white/30">/</span>
                <span className="text-red-400">{metadata.deaths}</span>
                <span className="text-white/30">/</span>
                <span className="text-sky-400">{metadata.assists}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 rounded-xl bg-background/50 px-4 py-2.5 ring-1 ring-white/5">
            <div className="flex size-7 items-center justify-center rounded-lg bg-amber-500/10">
              <Coins className="size-4 text-amber-400" />
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] font-semibold uppercase tracking-wider text-white/40">
                GPM
              </span>
              <span className="text-sm font-bold tabular-nums text-white">
                {metadata.goldPerMinute}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 rounded-xl bg-background/50 px-4 py-2.5 ring-1 ring-white/5">
            <div className="flex size-7 items-center justify-center rounded-lg bg-rose-500/10">
              <Flame className="size-4 text-rose-400" />
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] font-semibold uppercase tracking-wider text-white/40">
                Hero DMG
              </span>
              <span className="text-sm font-bold tabular-nums text-white">
                {metadata.heroDamage.toLocaleString("uk-UA")}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 rounded-xl bg-background/50 px-4 py-2.5 ring-1 ring-white/5">
            <div className="flex size-7 items-center justify-center rounded-lg bg-indigo-500/10">
              <Shield className="size-4 text-indigo-400" />
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] font-semibold uppercase tracking-wider text-white/40">
                Tower DMG
              </span>
              <span className="text-sm font-bold tabular-nums text-white">
                {metadata.towerDamage.toLocaleString("uk-UA")}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
