import { ExternalLink, Lock } from "lucide-react";
import GameAccountsForm from "./GameAccountsInputsButton";
import { TPlatformTypes } from "@/types/connections.types";

interface IGameEntry {
  id: string;
  name: string;
  platform: TPlatformTypes;
  placeholder: string;
  hint: string;
  hintLink?: string;
  comingSoon: boolean;
  icon: string;
}

const GAMES: IGameEntry[] = [
  {
    id: "dota2",
    name: "Dota 2",
    platform: "STEAM",
    placeholder: "Введіть ваш Dota 2 ID",
    hint: "Відкрийте Steam → профіль → URL містить ваш ID, або знайдіть Friend ID у клієнті Dota 2.",
    hintLink: "https://steamcommunity.com",
    comingSoon: false,
    icon: "🎮",
  },
  {
    id: "brawlstars",
    name: "Brawl Stars",
    platform: "SUPERCELL",
    placeholder: "Введіть ваш тег (#XXXXXXXX)",
    hint: "Відкрийте Brawl Stars → натисніть на профіль → тег під ніком.",
    comingSoon: true,
    icon: "⭐",
  },
  {
    id: "valorant",
    name: "Valorant",
    platform: "RIOT",
    placeholder: "Введіть Riot ID (Name#Tag)",
    hint: "Відкрийте Valorant → Riot ID у верхньому правому куті лобі.",
    comingSoon: true,
    icon: "🎯",
  },
];

const GameAccountBlockInputs = ({
  hasConnections,
}: {
  hasConnections: boolean;
}) => {
  return (
    <>
      {GAMES.map((info) => {
        return (
          <div
            key={info.id}
            className="rounded-xl bg-background/40 p-4 ring-1 ring-white/5 transition-all hover:ring-white/10"
          >
            <div className="flex items-center justify-between mb-2.5">
              <div className="flex items-center gap-2">
                <span className="text-base">{info.icon}</span>
                <span className="text-sm font-semibold text-white">
                  {info.name}
                </span>
              </div>
              {info.comingSoon && (
                <span className="flex items-center gap-1 rounded-full bg-turquoise/10 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-turquoise ring-1 ring-turquoise/20">
                  <Lock className="size-2.5" />
                  Coming Soon
                </span>
              )}
            </div>

            { !hasConnections ? (
            <GameAccountsForm
              inputParams={{
                placeholder: info.placeholder,
                comingSoon: info.comingSoon,
                platformName: info.platform,
              }}
            />
            ) : (
              <div></div>
            ) }


            <p className="mt-1.5 text-[11px] leading-relaxed text-white/30">
              {info.hint}
            </p>
            {info.hintLink && (
              <a
                href={info.hintLink}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1 inline-flex items-center gap-1 text-[11px] text-turquoise/60 transition-colors hover:text-turquoise"
              >
                <ExternalLink className="size-3" />
                Відкрити Steam
              </a>
            )}
          </div>
        );
      })}
    </>
  );
};

export default GameAccountBlockInputs;
