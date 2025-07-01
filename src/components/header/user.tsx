import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/authOptions"

export default async function User(){
    const session = await getServerSession(authOptions)

    if(!session || !session.user){
      return
    }

  return (
    <main>
        <div className="hover:underline">{session?.user?.name}</div>
    </main>
  )
}
