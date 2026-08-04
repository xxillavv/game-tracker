import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const cookie = await cookies();

const isUserExist = async () => {
  const response = await fetch("http://localhost:3001/api/users/me", {
    headers: {
      Cookie: cookie.toString()
    }
  });

  if (response.status === 401) {
    redirect("/login");
  }

  return response.json()
};

const page = () => {
  return (
    <>
      <Header />

      {isUserExist()}

      <Footer />
    </>
  );
};

export default page;
