import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { redirect } from "next/navigation";
import { getLeaderboardData } from "../queries";
import { LeadersPagesNavigation } from "@/components/LeadersPagesNavigation";

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

  console.log(leaders);

  return (
    <>
      <Header />
      <div>page</div>
      <LeadersPagesNavigation navigationProps={{
        page,
        pagesCount: leaders.metadata.totalPages
      }} />
      <Footer />
    </>
  );
};

export default page;
