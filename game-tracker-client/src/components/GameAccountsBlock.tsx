import { Gamepad2 } from "lucide-react";
import GameAccountBlockInputs from "./GameAccountBlockInputs";
import { getUserConnections } from "@/app/profile/queries";

const GameAccountsBlock = async () => {
  const userConnections = await getUserConnections();

  return (
    <div className="rounded-2xl bg-dark-blue/60 p-8 ring-1 ring-white/5 h-full">
      <div className="flex items-center gap-3 mb-5">
        <div className="flex size-10 items-center justify-center rounded-xl bg-turquoise/10 ring-1 ring-turquoise/20">
          <Gamepad2 className="size-5 text-turquoise" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-white">Ігрові акаунти</h3>
          <p className="text-xs text-white/40">
            {"Прив'яжіть"} свої ігрові профілі
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <GameAccountBlockInputs connections={userConnections} />
      </div>
    </div>
  );
};

export default GameAccountsBlock;
