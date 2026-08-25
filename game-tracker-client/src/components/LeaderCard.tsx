import { Crown, Medal, Shield, Sparkles, Trophy, User } from "lucide-react";
import { ILeaderCardProps } from "@/types/leaderboard.types";

function RankIndicator({ rank }: { rank: number }) {
  if (rank === 1) {
    return (
      <div className="relative flex size-12 shrink-0 items-center justify-center rounded-2xl bg-amber-400/15 ring-1 ring-amber-400/30 shadow-[0_0_20px_rgba(251,191,36,0.15)]">
        <Crown className="size-6 text-amber-400 animate-pulse" />
        <span className="absolute -bottom-1 -right-1 flex size-4 items-center justify-center rounded-full bg-amber-400 text-[10px] font-black text-black">
          1
        </span>
      </div>
    );
  }

  if (rank === 2) {
    return (
      <div className="relative flex size-12 shrink-0 items-center justify-center rounded-2xl bg-slate-300/10 ring-1 ring-slate-300/30 shadow-[0_0_20px_rgba(203,213,225,0.1)]">
        <Medal className="size-6 text-slate-300" />
        <span className="absolute -bottom-1 -right-1 flex size-4 items-center justify-center rounded-full bg-slate-300 text-[10px] font-black text-black">
          2
        </span>
      </div>
    );
  }

  if (rank === 3) {
    return (
      <div className="relative flex size-12 shrink-0 items-center justify-center rounded-2xl bg-amber-600/15 ring-1 ring-amber-600/30 shadow-[0_0_20px_rgba(217,119,6,0.1)]">
        <Medal className="size-6 text-amber-500" />
        <span className="absolute -bottom-1 -right-1 flex size-4 items-center justify-center rounded-full bg-amber-600 text-[10px] font-black text-white">
          3
        </span>
      </div>
    );
  }

  return (
    <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-white/5 ring-1 ring-white/10 group-hover:bg-turquoise/10 group-hover:ring-turquoise/30 group-hover:text-turquoise transition-colors">
      <span className="text-base font-bold text-white/50 group-hover:text-turquoise tabular-nums">
        #{rank}
      </span>
    </div>
  );
}

export function LeaderCard({ player }: ILeaderCardProps) {
  const isTopThree = player.playerRank <= 3;

  return (
    <div
      className={`group relative overflow-hidden rounded-2xl bg-dark-blue/60 p-5 ring-1 transition-all duration-300 hover:bg-dark-blue/90 hover:scale-[1.01] ${
        isTopThree
          ? "ring-turquoise/30 shadow-[0_4px_24px_rgba(0,228,184,0.06)]"
          : "ring-white/5 hover:ring-turquoise/30 hover:shadow-[0_4px_24px_rgba(0,228,184,0.04)]"
      }`}
    >
      <div className="absolute top-0 right-0 h-24 w-24 bg-linear-to-bl from-turquoise/5 to-transparent rounded-bl-full pointer-events-none group-hover:from-turquoise/15 transition-all duration-300" />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4 min-w-0">
          <RankIndicator rank={player.playerRank} />

          <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-white/5 ring-1 ring-white/10 group-hover:ring-turquoise/20 transition-colors">
            <User className="size-5 text-white/40 group-hover:text-turquoise transition-colors" />
          </div>

          <div className="flex flex-col min-w-0">
            <div className="flex items-center gap-2">
              <span className="truncate text-lg font-bold text-white group-hover:text-turquoise transition-colors">
                {player.username}
              </span>
              {isTopThree && (
                <span className="hidden sm:inline-flex items-center gap-1 rounded-full bg-turquoise/10 px-2 py-0.5 text-[11px] font-semibold text-turquoise ring-1 ring-turquoise/20">
                  <Sparkles className="size-3" />
                  PRO
                </span>
              )}
            </div>

            <div className="flex items-center gap-2 mt-0.5 text-xs text-white/40">
              <span>ID: {player.leaderboardId}</span>
              {player.teamId ? (
                <>
                  <span>•</span>
                  <span>Team #{player.teamId}</span>
                </>
              ) : null}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 sm:self-center pl-16 sm:pl-0">
          {player.teamName ? (
            <div className="flex items-center gap-2 rounded-xl bg-background/50 px-3.5 py-2 ring-1 ring-white/5 group-hover:ring-turquoise/20 transition-all">
              <div className="flex size-6 items-center justify-center rounded-lg bg-turquoise/10">
                <Shield className="size-3.5 text-turquoise" />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] uppercase font-semibold tracking-wider text-white/40">
                  Команда
                </span>
                <span className="text-sm font-semibold text-white/90 truncate max-w-35 sm:max-w-45">
                  {player.teamName}
                </span>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-2 rounded-xl bg-background/30 px-3.5 py-2 ring-1 ring-white/5 text-white/30">
              <Shield className="size-3.5" />
              <span className="text-xs font-medium">Без команди</span>
            </div>
          )}

          <div className="hidden md:flex flex-col items-end justify-center rounded-xl bg-background/50 px-4 py-2 ring-1 ring-white/5">
            <span className="text-[10px] uppercase font-semibold tracking-wider text-white/40 flex items-center gap-1">
              <Trophy className="size-2.5 text-turquoise" />
              Ранг
            </span>
            <span className="text-sm font-bold tabular-nums text-white">
              #{player.playerRank}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
