import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { ProfileCard } from "@/components/ProfileCard";
import GameAccountsBlock from "@/components/GameAccountsBlock";
import GameStatsBlock from "@/components/GameStatsBlock";
import { cookies } from "next/headers";
import { IUser } from "@/types/user.types";

const page = async () => {
  const cookieStore = await cookies();

  const isUserExist = async (): Promise<IUser> => {
    let cookieString = cookieStore.toString();

    let response = await fetch("http://localhost:3001/api/users/me", {
      cache: "no-store",
      headers: {
        Cookie: cookieString,
      },
    });
    return response.json();
  };

  const user = await isUserExist();

  return (
    <>
      <Header />
      <section className="container mx-auto max-w-7xl px-6 py-10 font-mono">
        <div className="flex flex-col gap-10 lg:flex-row mb-10">
          <div className="flex-1">
            <ProfileCard user={user} />
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
