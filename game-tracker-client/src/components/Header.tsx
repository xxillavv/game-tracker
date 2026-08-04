import { Input } from "@/components/ui/input";
import { Zap } from "lucide-react";
import Link from "next/link";

export const Header = () => {
  return (
    <header className="mb-28 py-4 font-mono border-b border-white/5 bg-background/80 backdrop-blur-md">
      <div className="container mx-auto flex items-center justify-center gap-60">
        <div className="flex gap-12">
          <Link
            href="/"
            className="flex items-center text-xl font-semibold tracking-wide text-white transition-opacity hover:opacity-80"
          >
            <span className="mr-2 rounded-xl bg-turquoise p-1.5">
              <Zap color="black" />
            </span>
            NEXUS<span className="text-turquoise">.gg</span>
          </Link>
          <ul className="flex items-center gap-2">
            <li className="rounded-xl bg-dark-blue/60 px-5 py-2.5 ring-1 ring-turquoise/20 text-turquoise text-sm transition-all">
              <Link href="/dashboard">Дашборд</Link>
            </li>
            <li className="rounded-xl px-5 py-2.5 text-sm text-white/60 transition-all hover:bg-dark-blue/40 hover:text-white">
              <Link href="/leaders">Лідери</Link>
            </li>
            <li className="rounded-xl px-5 py-2.5 text-sm text-white/60 transition-all hover:bg-dark-blue/40 hover:text-white">
              <Link href="/matches">Матчі</Link>
            </li>
          </ul>
        </div>
        <div className="flex items-center gap-4">
          <Input
            placeholder="Пошук гравця..."
            className="font-mono rounded-xl bg-dark-blue/60 border-none ring-1 ring-white/5 text-input-text placeholder:text-white/30 transition-all focus:ring-turquoise/30"
          />
          <Link
            href="/profile"
            className="flex items-center gap-2.5 whitespace-nowrap rounded-xl bg-dark-blue/60 px-4 py-2.5 text-sm text-white/80 ring-1 ring-white/5 transition-all hover:ring-turquoise/20 hover:text-white"
          >
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-turquoise opacity-75" />
              <span className="relative inline-flex size-2 rounded-full bg-turquoise" />
            </span>
            Мій профіль
          </Link>
        </div>
      </div>
    </header>
  );
};
