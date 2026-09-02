import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { MatchCard } from "@/components/MatchCard";
import { getUserMatches } from "./queries";
import { Gamepad2, Swords } from "lucide-react";

const page = async () => {
  const matches = await getUserMatches();

  return (
    <>
      <Header />
      <section className="container mx-auto px-4 pb-8 font-mono">
        <div className="flex flex-col items-center text-center">
          <div className="mb-10 inline-flex items-center gap-2 rounded-full bg-turquoise/10 px-4 py-1.5 text-sm text-turquoise ring-1 ring-turquoise/20">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-turquoise opacity-75" />
              <span className="relative inline-flex size-2 rounded-full bg-turquoise" />
            </span>
            <Swords className="size-4" />
            Історія ігор
          </div>
          <h1 className="mb-8 text-4xl font-bold tracking-tight text-white md:text-5xl">
            Останні{" "}
            <span className="relative text-turquoise">
              матчі
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
                />
              </svg>
            </span>{" "}
            Dota 2
          </h1>
          <p className="mb-10 max-w-xl text-base leading-relaxed text-white/60">
            Детальна статистика ваших останніх зіграних матчів. Аналізуйте KDA,
            GPM, завдану шкоду та підвищуйте свій рівень гри.
          </p>
        </div>

        <div className="mb-6 flex items-center justify-between border-b border-white/5 pb-3">
          <div className="flex items-center gap-2">
            <span className="size-2 rounded-full bg-turquoise" />
            <span className="text-sm font-semibold uppercase tracking-wider text-white/70">
              Список матчів
            </span>
            <span className="rounded-md bg-turquoise/10 px-2 py-0.5 text-xs text-turquoise ring-1 ring-turquoise/20">
              {Array.isArray(matches) ? matches.length : 0} матчів
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-4 mb-20">
          {Array.isArray(matches) && matches.length > 0 ? (
            matches.map((match) => (
              <MatchCard key={match.matchId ?? match.gameMatchId} match={match} />
            ))
          ) : (
            <div className="flex flex-col items-center justify-center gap-3 rounded-2xl bg-dark-blue/60 p-12 text-center ring-1 ring-white/5">
              <div className="flex size-12 items-center justify-center rounded-2xl bg-turquoise/10 text-turquoise ring-1 ring-turquoise/20">
                <Gamepad2 className="size-6" />
              </div>
              <p className="text-lg font-bold text-white">Матчів не знайдено</p>
              <p className="max-w-md text-sm text-white/40">
                Зіграйте свій перший матч або оновіть статистику у профілі, щоб
                тут зʼявилися дані.
              </p>
            </div>
          )}
        </div>
      </section>
      <Footer />
    </>
  );
};

export default page;