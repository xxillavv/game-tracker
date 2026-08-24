import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { getLeaderboardData } from "../queries";

const page = async () => {
  const leaders = await getLeaderboardData()

  console.log(leaders)

  return (
    <>
      <Header />
      <div>page</div>
      <Footer />
    </>
  );
};

export default page;
