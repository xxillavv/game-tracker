import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { redirect } from "next/navigation";
import { getLeaderboardData } from "../queries";
import { LeaderCard } from "@/components/LeaderCard";
import { LeadersPagesNavigation } from "@/components/LeadersPagesNavigation";
import { Crown, Gamepad2, Layers, Shield, Trophy } from "lucide-react";

type TSearchParams = {
  page?: string;
};

const page = async ({
  searchParams,
}: {
  searchParams: Promise<TSearchParams>;
}) => {
  const params = await searchParams;

  if (!params.page) {
    redirect("/leaders?page=1");
  }

  const page = +params.page;

  const leaders = await getLeaderboardData(page);

  const uniqueTeams = new Set(
    leaders.data.map((el) => el.teamName).filter(Boolean),
  );

  const topRankOnPage = leaders.data[0]?.playerRank ?? (page - 1) * 100 + 1;

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
            <Trophy className="size-4" />
            Глобальний рейтинг
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-white md:text-5xl mb-8">
            Таблиця{" "}
            <span className="relative text-turquoise">
              лідерів
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
          <p className="max-w-xl mb-10 text-base leading-relaxed text-white/60">
            Світовий рейтинг найкращих кіберспортсменів. Відстежуйте позиції
            топ-гравців, їхні команди та результати сезону.
          </p>
          <div className="flex w-full max-w-4xl flex-wrap gap-4 mb-6">
            <div className="flex-1 min-w-[calc(50%-0.5rem)] md:min-w-0 rounded-2xl bg-dark-blue/60 p-4 ring-1 ring-white/5 transition-all hover:ring-turquoise/20">
              <div className="mb-2 flex items-center justify-center">
                <div className="rounded-xl bg-turquoise/10 p-2">
                  <Gamepad2 className="size-4 text-turquoise" />
                </div>
              </div>
              <p className="text-xl font-bold text-white">
                {leaders.metadata.totalCount.toLocaleString()}
              </p>
              <p className="mt-0.5 text-xs text-white/40">Гравців у базі</p>
            </div>
            <div className="flex-1 min-w-[calc(50%-0.5rem)] md:min-w-0 rounded-2xl bg-dark-blue/60 p-4 ring-1 ring-white/5 transition-all hover:ring-turquoise/20">
              <div className="mb-2 flex items-center justify-center">
                <div className="rounded-xl bg-turquoise/10 p-2">
                  <Crown className="size-4 text-turquoise" />
                </div>
              </div>
              <p className="text-xl font-bold text-white">#{topRankOnPage}</p>
              <p className="mt-0.5 text-xs text-white/40">Топ ранг сторінки</p>
            </div>
            <div className="flex-1 min-w-[calc(50%-0.5rem)] md:min-w-0 rounded-2xl bg-dark-blue/60 p-4 ring-1 ring-white/5 transition-all hover:ring-turquoise/20">
              <div className="mb-2 flex items-center justify-center">
                <div className="rounded-xl bg-turquoise/10 p-2">
                  <Shield className="size-4 text-turquoise" />
                </div>
              </div>
              <p className="text-xl font-bold text-white">{uniqueTeams.size}</p>
              <p className="mt-0.5 text-xs text-white/40">Команд на сторінці</p>
            </div>
            <div className="flex-1 min-w-[calc(50%-0.5rem)] md:min-w-0 rounded-2xl bg-dark-blue/60 p-4 ring-1 ring-white/5 transition-all hover:ring-turquoise/20">
              <div className="mb-2 flex items-center justify-center">
                <div className="rounded-xl bg-turquoise/10 p-2">
                  <Layers className="size-4 text-turquoise" />
                </div>
              </div>
              <p className="text-xl font-bold text-white">
                {page} / {leaders.metadata.totalPages}
              </p>
              <p className="mt-0.5 text-xs text-white/40">Поточна сторінка</p>
            </div>
          </div>
        </div>
        <div className="mt-10 flex items-center justify-between border-b border-white/5 pb-3">
          <div className="flex items-center gap-2">
            <span className="size-2 rounded-full bg-turquoise" />
            <span className="text-sm font-semibold uppercase tracking-wider text-white/70">
              Список гравців
            </span>
            <span className="rounded-md bg-turquoise/10 px-2 py-0.5 text-xs text-turquoise ring-1 ring-turquoise/20">
              {leaders.data.length} гравців
            </span>
          </div>
          <span className="text-xs text-white/40">
            Сторінка {page} із {leaders.metadata.totalPages}
          </span>
        </div>
      </section>
      <div className="container mx-auto flex flex-col gap-4 mb-10">
        {leaders.data.map((el) => {
          return (
            <LeaderCard
              key={el.leaderboardId}
              player={{
                username: el.username,
                teamName: el.teamName,
                teamId: el.teamId,
                playerRank: el.playerRank,
                leaderboardId: el.leaderboardId,
              }}
            />
          );
        })}
      </div>
      <LeadersPagesNavigation
        page={page}
        totalPages={leaders.metadata.totalPages}
      />
      <Footer />
    </>
  );
};

export default page;
