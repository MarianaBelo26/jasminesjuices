import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"

export default async function User(){
    const session = await getServerSession(authOptions)

    if(!session || !session.user){
      return
    }

  return (
    <main>
        <div>{session?.user?.name}</div>
    </main>
  )
}
