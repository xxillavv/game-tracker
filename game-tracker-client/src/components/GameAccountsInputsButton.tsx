"use client";

import { Save } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useState } from "react";
import { useConnections } from "@/hooks/useConnections";
import { TPlatformTypes } from "@/types/connections.types";

type TInputParamsProps = {
  placeholder: string;
  comingSoon: boolean;
  platformName: TPlatformTypes;
};

const GameAccountsForm = ({
  inputParams,
}: {
  inputParams: TInputParamsProps;
}) => {
  const [value, setValue] = useState<string>("");

  const { createConnection } = useConnections();

  return (
    <>
      <div className="flex gap-2">
        <Input
          placeholder={inputParams.placeholder}
          disabled={inputParams.comingSoon}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="h-9 flex-1 rounded-lg border-none bg-dark-blue/80 px-3 text-sm ring-1 ring-white/5 text-input-text placeholder:text-white/25 transition-all focus:ring-turquoise/30 disabled:opacity-40 disabled:cursor-not-allowed"
        />
        <Button
          type="button"
          className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-turquoise/10 text-turquoise ring-1 ring-turquoise/20 transition-all hover:bg-turquoise/20 disabled:opacity-30 disabled:cursor-not-allowed"
          onClick={() =>
            createConnection.mutate({
              platformName: inputParams.platformName,
              externalId: value,
            })
          }
        >
          <Save className="size-4" />
        </Button>
      </div>
    </>
  );
};

export default GameAccountsForm;
