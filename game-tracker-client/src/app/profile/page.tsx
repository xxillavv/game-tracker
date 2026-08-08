import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { ProfileCard } from "@/components/ProfileCard";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { IUser } from "@/types/user.types";

const page = async () => {
  const cookieStore = await cookies();

  const isUserExist = async (): Promise<IUser> => {
    const response = await fetch("http://localhost:3001/api/users/me", {
      headers: {
        Cookie: cookieStore.toString(),
      },
    });

    if (response.status === 401) {
      redirect("/login");
    }

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
