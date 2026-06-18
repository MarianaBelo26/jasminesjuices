'use client'

import Link from "next/link"
import { forwardRef } from "react"

type Props = {
  toggleUserMenu: () => void 
  logout: () => void
}

const UserMenu = forwardRef<HTMLDivElement, Props>(({toggleUserMenu, logout}, ref) => {

   const closeUserMenu = () =>{
    return toggleUserMenu()
  }

  return (
    <div ref={ref} className="flex flex-col items-center justify-center gap-3 w-[150px] h-[100px] absolute right-3 top-[70px] z-50 rounded-[10px] bg-border-user-menu shadow-md">
      <Link href={'/userPage'} onClick={closeUserMenu} className="hover:bg-hover-menu-user hover:text-default-text w-[100%] h-[35px] text-center">
        <button type="button" className="cursor-pointer">Meus pedidos</button> 
      </Link>
      <button onClick={logout} type='button' className="hover:bg-hover-menu-user hover:text-default-text w-[100%] h-[35px] text-center cursor-pointer">
        Logout
      </button>
    </div>
  )
})

UserMenu.displayName = 'UserMenu'
export default UserMenu

