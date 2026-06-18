'use client'

import { signOut, useSession } from "next-auth/react"
import Link from "next/link"
import './account/userProfile/page'
import './account/orderReturn/page'
import { useTranslation } from "react-i18next"
import { useEffect, useState } from "react"

export default function UserPage() {

  const { t } = useTranslation()

  const { data: session } = useSession()

  const [localUser, setLocalUser] = useState<{ name: string, email: string } | null>(null)

  useEffect(() => {
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      setLocalUser(JSON.parse(storedUser))
    }
  }, [])

  const logout = async () => {
    localStorage.removeItem("user")
    await signOut({ redirect: false })
    window.location.href = '/'
  }

  const user = session?.user?.name ? { name: session.user.name } : localUser

  return (
    <main className="bg-background-homepage flex justify-center items-center min-h-screen">
      <div className="flex flex-col justify-start w-[90%] lg:h-[60vh] gap-7 mb-5">
        <h2 className="w-[90%] text- font-['josefin_Sans'] text-[30px] text-highlighted-text">{t('userpage.welcomeMessage')} {user?.name}</h2>
        <div className="flex flex-wrap justify-around lg:justify-start content-start gap-[20px]">
          <div className="w-[90%] md:w-[45%] lg:w-[30%] bg-button-menu-user flex items-center justify-center border-y-solid border-y-1">
            <div className="border-dashed  border-x-1 w-[100%] [border-image:linear-gradient(to_top,theme(colors.black)_20%,theme(colors.background-homepage)_20%_40%,theme(colors.black)_40%_60%,theme(colors.background-homepage)_60%_80%,theme(colors.black)_80%)_1]">
              <button type="button"
                className="hover:bg-hover-menu-user hover:text-default-text w-full p-[30px] bg-button-menu-user text-center cursor-pointer font-['julius_Sans_One'] text-[15px]"><Link href='/userPage/account/userProfile/' className="active:opacity-50 transition-opacity">{t('userpage.myprofile')}</Link>
              </button>
            </div>
          </div>
          <div className="w-[90%] md:w-[45%] lg:w-[30%] bg-button-menu-user flex items-center justify-center border-y-solid border-y-1">
            <div className="border-dashed  border-x-1 w-[100%] [border-image:linear-gradient(to_top,theme(colors.black)_20%,theme(colors.background-homepage)_20%_40%,theme(colors.black)_40%_60%,theme(colors.background-homepage)_60%_80%,theme(colors.black)_80%)_1]">
              <button type="button"
                className="hover:bg-hover-menu-user hover:text-default-text w-full p-[30px] bg-button-menu-user text-center cursor-pointer font-['julius_Sans_One'] text-[15px]"><Link href='/userPage/account/orderReturn/' className="active:opacity-50 transition-opacity">{t('userpage.ordersReturn')}</Link></button>
            </div>
          </div>
          <div className="w-[90%] md:w-[45%] lg:w-[30%] bg-button-menu-user flex items-center justify-center border-y-solid border-y-1">
            <div className="border-dashed  border-x-1 w-[100%] [border-image:linear-gradient(to_top,theme(colors.black)_20%,theme(colors.background-homepage)_20%_40%,theme(colors.black)_40%_60%,theme(colors.background-homepage)_60%_80%,theme(colors.black)_80%)_1]">
              <button type="button"
                className="hover:bg-hover-menu-user hover:text-default-text w-full p-[30px] bg-button-menu-user text-center cursor-pointer font-['julius_Sans_One'] text-[15px]"><Link href='/userPage/account/creditsRefunds/' className="active:opacity-50 transition-opacity">{t('userpage.creditsRefunds')}</Link></button>
            </div>
          </div>
          <div className="w-[90%] md:w-[45%] lg:w-[30%] bg-button-menu-user flex items-center justify-center border-y-solid border-y-1">
            <div className="border-dashed  border-x-1 w-[100%] [border-image:linear-gradient(to_top,theme(colors.black)_20%,theme(colors.background-homepage)_20%_40%,theme(colors.black)_40%_60%,theme(colors.background-homepage)_60%_80%,theme(colors.black)_80%)_1]">
              <button type="button"
                className="hover:bg-hover-menu-user hover:text-default-text w-full p-[30px] bg-button-menu-user text-center cursor-pointer font-['julius_Sans_One'] text-[15px]"><Link href='/userPage/account/address/' className="active:opacity-50 transition-opacity">{t('userpage.address')}</Link></button>
            </div>
          </div>
          <div className="w-[90%] md:w-[45%] lg:w-[30%] bg-button-menu-user flex items-center justify-center border-y-solid border-y-1">
            <div className="border-dashed  border-x-1 w-[100%] [border-image:linear-gradient(to_top,theme(colors.black)_20%,theme(colors.background-homepage)_20%_40%,theme(colors.black)_40%_60%,theme(colors.background-homepage)_60%_80%,theme(colors.black)_80%)_1]">
              <button type="button"
                className="hover:bg-hover-menu-user hover:text-default-text w-full p-[30px] bg-button-menu-user text-center cursor-pointer font-['julius_Sans_One'] text-[15px]" onClick={logout}>{t('userpage.logout')}
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
