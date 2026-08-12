"use client";

import { useState } from "react";
import {
  TrendingUp,
  Target,
  Gamepad2,
  Flame,
  Lock,
  BarChart3,
  RefreshCw,
} from "lucide-react";
import { Button } from "./ui/button";

interface StatCard {
  id: string;
  label: string;
  value: string;
  icon: typeof TrendingUp;
  iconColor: string;
  iconBg: string;
}

const STATS: StatCard[] = [
  {
    id: "mmr",
    label: "Рейтинг MMR",
    value: "—",
    icon: TrendingUp,
    iconColor: "text-turquoise",
    iconBg: "bg-turquoise/10",
  },
  {
    id: "winrate",
    label: "Відсоток перемог",
    value: "—",
    icon: Target,
    iconColor: "text-turquoise",
    iconBg: "bg-turquoise/10",
  },
  {
    id: "matches",
    label: "Всього матчів",
    value: "—",
    icon: Gamepad2,
    iconColor: "text-turquoise",
    iconBg: "bg-turquoise/10",
  },
  {
    id: "streak",
    label: "Поточна серія",
    value: "—",
    icon: Flame,
    iconColor: "text-orange-400",
    iconBg: "bg-orange-400/10",
  },
];

const GameStatsBlock = () => {
  const [selectedGame] = useState<string>("dota2");

  return (
    <div className="rounded-2xl bg-dark-blue/60 p-8 ring-1 ring-white/5 mb-20">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button
            type="button"
            className={`flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-semibold transition-all ${
              selectedGame === "dota2"
                ? "bg-turquoise/10 text-turquoise ring-1 ring-turquoise/20"
                : "bg-white/5 text-white/40"
            }`}
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

      <div className="mt-6 flex flex-wrap gap-4">
        {STATS.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.id}
              className="flex-1 basis-[calc(50%-0.5rem)] lg:basis-0 rounded-xl bg-background/40 p-5 ring-1 ring-white/5 transition-all hover:ring-white/10"
            >
              <div className="mb-3 flex items-center gap-2">
                <div className={`rounded-lg ${stat.iconBg} p-2`}>
                  <Icon className={`size-4 ${stat.iconColor}`} />
                </div>
                <span className="text-xs font-medium uppercase tracking-wider text-white/40">
                  {stat.label}
                </span>
              </div>
              <p className="text-2xl font-bold tabular-nums text-white">
                {stat.value}
              </p>
            </div>
          );
        })}
      </div>

      <div className="mt-4 flex items-center justify-center gap-3 rounded-xl bg-background/40 p-6 ring-1 ring-white/5">
        <BarChart3 className="size-5 text-white/20" />
        <p className="text-sm text-white/30">
          Прив&#39;яжіть Dota 2 акаунт, щоб побачити вашу статистику
        </p>
      </div>
    </div>
  );
};

export default GameStatsBlock;
