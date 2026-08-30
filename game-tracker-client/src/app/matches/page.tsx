import { Footer } from "@/components/Footer"
import { Header } from "@/components/Header"
import { getUserMatches } from "./queries"

const page = async () => {
  const matches = await getUserMatches() 

  console.log(matches)

  return (
    <>
      <Header />
      <div>page</div>
      <Footer />
    </>
    
  )
}

export default page