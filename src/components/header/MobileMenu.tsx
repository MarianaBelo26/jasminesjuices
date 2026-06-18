'use client'

import Link from "next/link"
import '../../i18n.tsx'
import { useTranslation } from "react-i18next"

type Props = {
    user: { name: string } | null,
    toggleMenu: () => void,
    toggleUserMenu: () => void
}

export default function MobileMenu({ user, toggleMenu}: Props) {

    const {t} = useTranslation()

    return (
        <div className="fixed inset-0 bg-background-homepage flex flex-col items-center justify-center gap-8 text-default-text font-['josefin_Slab'] font-semibold text-[25px] md:hidden transition-opacity duration-300 z-50 mt-[60px]">
            <Link href="/products" onClick={toggleMenu} className="hover:underline">
                {t('nav.products')}
            </Link>
            <Link href="/cart" onClick={toggleMenu} className="hover:underline">
                {t('nav.cart')}
            </Link>
            {user ? (<Link href="/userPage" onClick={toggleMenu} className="hover:underline">{user.name}</Link>) : (
                <Link href="/login" onClick={toggleMenu}  className="hover:underline" >
                    {t('nav.login')}
                </Link>
            )}
        </div>
    )
}