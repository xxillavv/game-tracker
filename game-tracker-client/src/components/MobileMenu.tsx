"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { HeaderNavigation } from "./HeaderNavigation";

export const MobileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const close = () => setIsOpen(false);

  return (
    <div className="md:hidden">
      <button
        type="button"
        aria-label={isOpen ? "Закрити меню" : "Відкрити меню"}
        aria-expanded={isOpen}
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex size-10 items-center justify-center rounded-xl bg-dark-blue/60 text-white/80 ring-1 ring-white/5 transition-all hover:text-white hover:ring-turquoise/20"
      >
        {isOpen ? <X className="size-5" /> : <Menu className="size-5" />}
      </button>
      {isOpen && (
        <div className="absolute inset-x-0 top-full z-50 border-b border-white/5 bg-background px-4 pb-5 pt-3 shadow-[0_16px_32px_rgba(0,0,0,0.4)]">
          <HeaderNavigation variant="column" onNavigate={close} />
          <div className="mt-4 flex flex-col gap-3 border-t border-white/5 pt-4">
            <Input
              placeholder="Пошук гравця..."
              className="h-10 font-mono rounded-xl bg-dark-blue/60 border-none ring-1 ring-white/5 text-input-text placeholder:text-white/30 transition-all focus:ring-turquoise/30"
            />
            <Link
              href="/profile"
              onClick={close}
              className="flex items-center justify-center gap-2.5 rounded-xl bg-dark-blue/60 px-4 py-2.5 text-sm text-white/80 ring-1 ring-white/5 transition-all hover:ring-turquoise/20 hover:text-white"
            >
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-turquoise opacity-75" />
                <span className="relative inline-flex size-2 rounded-full bg-turquoise" />
              </span>
              Мій профіль
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};
