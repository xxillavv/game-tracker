import { Input } from "@/components/ui/input";
import { Zap } from "lucide-react";
import Link from "next/link";
import { HeaderNavigation } from "./HeaderNavigation";
import { MobileMenu } from "./MobileMenu";

export const Header = () => {
  return (
    <header className="relative z-40 mb-12 py-4 font-mono border-b border-white/5 bg-background/80 backdrop-blur-md md:mb-20 lg:mb-28">
      <div className="container mx-auto flex items-center justify-between gap-4 px-4 md:px-6">
        <div className="flex items-center gap-4 lg:gap-12">
          <Link
            href="/"
            className="flex shrink-0 items-center text-xl font-semibold tracking-wide text-white transition-opacity hover:opacity-80"
          >
            <span className="mr-2 rounded-xl bg-turquoise p-1.5">
              <Zap className="text-black size-5" />
            </span>
            NEXUS<span className="text-turquoise">.gg</span>
          </Link>
          <nav className="hidden md:block">
            <HeaderNavigation />
          </nav>
        </div>
        <div className="hidden items-center gap-4 md:flex">
          <Input
            placeholder="Пошук гравця..."
            className="hidden w-56 font-mono rounded-xl bg-dark-blue/60 border-none ring-1 ring-white/5 text-input-text placeholder:text-white/30 transition-all focus:ring-turquoise/30 lg:block"
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
        <MobileMenu />
      </div>
    </header>
  );
};
