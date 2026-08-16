import { CircleCheck, ExternalLink, Lock } from "lucide-react";
import GameAccountsForm from "./GameAccountsInputsButton";
import {
  ICreateConnectionResponse,
  TPlatformTypes,
} from "@/types/connections.types";
import DeleteConnectionButton from "./DeleteConnectionButton";
import { games } from "@/app/profile/constants";

const GameAccountBlockInputs = ({
  connections,
}: {
  connections: ICreateConnectionResponse[];
}) => {
  return (
    <>
      {games.map((info) => {
        let currentConnection = connections?.find(
          (el) => el.platformName === info.platform,
        );

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
            {currentConnection ? (
              <div className="flex gap-2">
                <div className="flex h-9 flex-1 items-center gap-2 rounded-lg bg-dark-blue/80 px-3 ring-1 ring-turquoise/20">
                  <CircleCheck className="size-3.5 shrink-0 text-turquoise" />
                  <span className="truncate text-sm text-white/80">
                    {currentConnection.externalId}
                  </span>
                  <span className="ml-auto shrink-0 rounded-full bg-turquoise/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-turquoise">
                    Підключено
                  </span>
                </div>
                <DeleteConnectionButton
                  connectionId={currentConnection.connectionId}
                />
              </div>
            ) : (
              <GameAccountsForm
                inputParams={{
                  placeholder: info.placeholder,
                  comingSoon: info.comingSoon,
                  platformName: info.platform as TPlatformTypes,
                }}
              />
            )}
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
