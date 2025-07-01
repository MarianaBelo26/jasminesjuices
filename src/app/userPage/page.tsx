'use client'

import { signOut } from "next-auth/react"

export default function UserPage() {

  const logout = async () => {
    localStorage.removeItem("user")
    await signOut({ redirect: false })
    window.location.href = '/' 
  }

  return (
    <main className="bg-background-homepage h-[100vh] w-[100vw] flex justify-center items-center">
      <button
        type="button"
        className="hover:bg-hover-menu-user hover:text-default-text w-[170px] h-[40px] text-center cursor-pointer font-bold font-['josefin_Slab'] text-[25px]"
        onClick={logout}
      >
        Logout
      </button>
    </main>
  )
}
