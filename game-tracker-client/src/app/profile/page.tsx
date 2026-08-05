import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const page = async () => {
  const cookieStore = await cookies();
  
  const isUserExist = async () => {
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

  const user = await isUserExist()

  return (
    <>
      <Header />

      {user.username}

      <Footer />
    </>
  );
};

export default page;
