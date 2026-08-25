import { ProfileCard } from "@/components/ProfileCard";
import GameAccountsBlock from "@/components/GameAccountsBlock";
import GameStatsBlock from "@/components/GameStatsBlock";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const page = async () => {
  return (
    <>
      <Header />
      <section className="container mx-auto max-w-7xl px-6">
        <div className="flex flex-col gap-10 lg:flex-row mb-10">
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
