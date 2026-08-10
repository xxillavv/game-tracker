import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { ProfileCard } from "@/components/ProfileCard";
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
      <ProfileCard user={user} />
      <Footer />
    </>
  );
};

export default page;
