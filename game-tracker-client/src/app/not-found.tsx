import Link from "next/link";
import { Compass, Home, Trophy } from "lucide-react";

export default function NotFound() {
  return (
    <>
      <main className="container mx-auto flex flex-1 flex-col items-center justify-center px-4 pb-24 font-mono text-center">
        <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-96 rounded-full bg-turquoise/5 blur-[120px]" />

        <div className="relative mb-6 inline-flex items-center gap-2 rounded-full bg-turquoise/10 px-4 py-1.5 text-sm text-turquoise ring-1 ring-turquoise/20">
          <span className="relative flex size-2">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-turquoise opacity-75" />
            <span className="relative inline-flex size-2 rounded-full bg-turquoise" />
          </span>
          <Compass className="size-4" />
          Помилка 404
        </div>

        <h1 className="relative mb-4 text-7xl font-bold tracking-tight text-white md:text-9xl">
          4<span className="text-turquoise">0</span>4
        </h1>

        <h2 className="mb-4 text-2xl font-bold text-white md:text-3xl">
          Сторінку не знайдено
        </h2>

        <p className="mb-10 max-w-md text-base leading-relaxed text-white/60">
          Здається, ви потрапили за межі карти або запитана сторінка була переміщена чи видалена.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/"
            className="inline-flex h-12 items-center gap-2 rounded-xl bg-turquoise px-6 text-sm font-semibold text-black transition-all hover:bg-turquoise/80 hover:shadow-[0_0_24px_rgba(0,228,184,0.3)]"
          >
            <Home className="size-4" />
            На головну
          </Link>
          <Link
            href="/leaders?page=1"
            className="inline-flex h-12 items-center gap-2 rounded-xl bg-dark-blue/60 px-6 text-sm font-semibold text-white/80 ring-1 ring-white/10 transition-all hover:text-white hover:ring-turquoise/30"
          >
            <Trophy className="size-4 text-turquoise" />
            Таблиця лідерів
          </Link>
        </div>
      </main>
    </>
  );
}