import { Input } from "@/components/ui/input";
import { Activity, Zap } from "lucide-react";
import Link from "next/link";
export const Header = () => {
  return (
    <header className="mb-28 py-4 font-mono shadow-[0_4px_12px_-2px_rgba(0,0,0,0.08)]">
      <div className="container mx-auto flex items-center justify-center gap-60">
        <div className="flex gap-12">
          <Link
            href="/"
            className="flex items-center text-xl font-semibold tracking-wide text-white"
          >
            <span className="p-1.5 bg-turquoise border rounded-xl mr-2">
              <Zap color="black" />
            </span>
            NEXUS<span className="text-turquoise">.gg</span>
          </Link>
          <ul className="flex items-center gap-8">
            <li className="py-2.5 px-5 bg-dark-blue rounded-xl">
              <Link href="/dashboard">Дашборд</Link>
            </li>
            <li>
              <Link href="/leaders">Лідери</Link>
            </li>
            <li>
              <Link href="/matches">Матчі</Link>
            </li>
          </ul>
        </div>
        <div className="flex items-center gap-4">
          <Input
            placeholder="Пошук гравця..."
            className="font-mono bg-input border border-black text-input-text"
          />
          <Link
            href="/profile"
            className="bg-input p-3 rounded-2xl flex items-center gap-2.5 whitespace-nowrap text-sm"
          >
            <Activity color="green" className="size-5 text-accent" />
            Мій профіль
          </Link>
        </div>
      </div>
    </header>
  );
};
