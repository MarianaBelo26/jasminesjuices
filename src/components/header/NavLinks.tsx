'use client'

import Link from "next/link"
import '../../i18n.tsx'
import { useTranslation } from "react-i18next"

type Props = {
  pathname: string,
  user: { name?: string | null } | null,
  toggleUserMenu: () => void 
  userButtonRef: React.RefObject<HTMLParagraphElement | null>
}

export default function NavLinks({ pathname, user, toggleUserMenu, userButtonRef }: Props) {

  const {t} = useTranslation()

  return (
    <ul className="hidden md:flex gap-4 md:gap-8 lg:gap-12 font-['josefin_Slab'] font-semibold text-[16px] md:text-[23px] lg:text-[30px] text-default-text cursor-pointer">
      <li className="relative group overflow-hidden">
        <Link href="/products" className="active:opacity-50 transition-opacity">
          {t('nav.products')}
        </Link>
        <span
          className={`absolute left-0 bottom-0 w-full h-[1px] bg-default-text transition-transform duration-300 ${pathname === "/products" ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"}`}
        ></span>
      </li>
      <li className="relative group overflow-hidden">
        <Link href="/cart" className="active:opacity-50 transition-opacity">
          {t('nav.cart')}
        </Link>
        <span
          className={`absolute left-0 bottom-0 w-full h-[1px] bg-default-text transition-transform duration-300 ${pathname === "/cart" ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"}`}
        ></span>
      </li>
      <li className="relative group overflow-hidden">
        {user ? (
          <p
            ref={userButtonRef}
            className="active:opacity-50 transition-opacity"
            onClick={toggleUserMenu}
          >
            {user.name}
          </p>
        ) : (
          <Link href="/login" className="active:opacity-50 transition-opacity">
            {t('nav.login')}
          </Link>
        )}
        <span
          className={`absolute left-0 bottom-0 w-full h-[1px] bg-default-text transition-transform duration-300 ${pathname === "/login" ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"}`}
        ></span>
      </li>
    </ul>
  )
}
