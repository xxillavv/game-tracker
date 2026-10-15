import { ProfileCard } from "@/components/ProfileCard";
import GameAccountsBlock from "@/components/GameAccountsBlock";
import GameStatsBlock from "@/components/GameStatsBlock";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const page = async () => {
  return (
    <>
      <Header />
      <section className="container mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mb-6 flex flex-col gap-6 lg:mb-10 lg:flex-row lg:gap-10">
          <div className="flex-1">
            <ProfileCard />
          </div>
          <div className="flex-2">
            <GameAccountsBlock />
          </div>
        </div>
        <div className="mt-6">
          <GameStatsBlock />
        </div>
      </section>
      <Footer />
    </>
  );
};

export default page;
