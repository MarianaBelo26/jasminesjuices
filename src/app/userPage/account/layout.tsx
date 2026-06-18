'use client'

import { signOut } from "next-auth/react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useTranslation } from "react-i18next"

type Props = {
    children: React.ReactNode
}

export default function UserLayout({children}:Props) {

    const {t} = useTranslation()

    const pathname = usePathname()

    const logout = async () => {
        localStorage.removeItem("user")
        await signOut({ redirect: false })
        window.location.href = '/'
    }

    return (
        <div className="pt-[70px] w-[100vw] h-[100vh] flex flex-row bg-backgroung-account">
            <div className="h-[100%] w-[28vw] pl-[3px] shadow">
                <h3 className="text-[20px] py-6">{t('userpage.myprofile')}</h3>
                <div className="flex flex-col gap-5">
                    <Link href={'/userPage/account/userProfile'}className={`hover:underline ${pathname === '/userPage/account/userProfile/' ? 'font-bold' : ''}`}>{t('userpage.myprofile')}</Link>
                    <Link href={'/userPage/account/orderReturn'} className={`hover:underline ${pathname === '/userPage/account/orderReturn/' ? 'font-bold' : ''}`}>{t('userpage.ordersReturn')}</Link>
                    <Link href={'/userPage/account/creditsRefunds'} className={`hover:underline ${pathname === '/userPage/account/creditsRefunds/' ? 'font-bold' : ''}`}>{t('userpage.creditsRefunds')}</Link>
                    <Link href={'/userPage/account/address'} className={`hover:underline ${pathname === '/userPage/account/address/' ? 'font-bold' : ''}`}>{t('userpage.address')}</Link>
                    <div className="hover:underline cursor-pointer" onClick={logout} >{t('userpage.logout')}</div>
                </div>
            </div>
            <div className="w-[70vw] h-[100%] flex flex-col gap-6 pl-3">
                {children}
            </div>
        </div>
    )
}