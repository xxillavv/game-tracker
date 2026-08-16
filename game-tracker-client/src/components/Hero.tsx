import { Button } from "@/components/ui/button";
import { Crosshair, TrendingUp, Trophy, Users } from "lucide-react";
import Link from "next/link";

export function Hero() {
  return (
    <section className="container mx-auto font-mono mb-40">
      <div className="flex flex-col items-center text-center">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-turquoise/10 px-4 py-1.5 text-sm text-turquoise ring-1 ring-turquoise/20">
          <span className="relative flex size-2">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-turquoise opacity-75" />
            <span className="relative inline-flex size-2 rounded-full bg-turquoise" />
          </span>
          Платформа активна
        </div>
        <h1 className="max-w-3xl text-5xl font-bold leading-tight tracking-tight text-white md:text-6xl">
          Відстежуй свій{" "}
          <span className="relative text-turquoise">
            прогрес
            <svg
              className="absolute -bottom-2 left-0 w-full"
              viewBox="0 0 286 8"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2 6C50 2 150 0 284 4"
                stroke="#00e4b8"
                strokeWidth="3"
                strokeLinecap="round"
                className="animate-[draw_1s_ease-in-out_forwards]"
              />
            </svg>
          </span>
          у іграх
        </h1>
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/60">
          Аналізуй статистику матчів, порівнюй результати з друзями та піднімайся
          в рейтингу. Все в одному місці.
        </p>
        <div className="mt-10 flex items-center gap-4">
          <Link href="/dashboard">
            <Button className="h-12 cursor-pointer rounded-xl bg-turquoise px-8 text-base font-semibold text-black transition-all hover:bg-turquoise/80 hover:shadow-[0_0_24px_rgba(0,228,184,0.3)]">
              <Crosshair className="mr-1 size-5" />
              Почати трекінг
            </Button>
          </Link>
          <Link href="/leaders">
            <Button
              variant="outline"
              className="h-12 cursor-pointer rounded-xl border-white/10 bg-dark-blue px-8 text-base font-semibold text-white transition-all hover:border-turquoise/30 hover:bg-dark-blue/80"
            >
              Переглянути лідерів
            </Button>
          </Link>
        </div>
        <div className="mt-16 grid w-full max-w-2xl grid-cols-3 gap-6">
          <div className="group rounded-2xl bg-dark-blue/60 p-6 ring-1 ring-white/5 transition-all hover:ring-turquoise/20">
            <div className="mb-3 flex items-center justify-center">
              <div className="rounded-xl bg-turquoise/10 p-2.5">
                <Users className="size-5 text-turquoise" />
              </div>
            </div>
            <p className="text-2xl font-bold text-white">12K+</p>
            <p className="mt-1 text-sm text-white/40">Гравців</p>
          </div>
          <div className="group rounded-2xl bg-dark-blue/60 p-6 ring-1 ring-white/5 transition-all hover:ring-turquoise/20">
            <div className="mb-3 flex items-center justify-center">
              <div className="rounded-xl bg-turquoise/10 p-2.5">
                <Trophy className="size-5 text-turquoise" />
              </div>
            </div>
            <p className="text-2xl font-bold text-white">58K+</p>
            <p className="mt-1 text-sm text-white/40">Матчів</p>
          </div>
          <div className="group rounded-2xl bg-dark-blue/60 p-6 ring-1 ring-white/5 transition-all hover:ring-turquoise/20">
            <div className="mb-3 flex items-center justify-center">
              <div className="rounded-xl bg-turquoise/10 p-2.5">
                <TrendingUp className="size-5 text-turquoise" />
              </div>
            </div>
            <p className="text-2xl font-bold text-white">94%</p>
            <p className="mt-1 text-sm text-white/40">Точність</p>
          </div>
        </div>
      </div>
    </section>
  );
}
