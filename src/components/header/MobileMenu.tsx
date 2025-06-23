"use client"

import Link from "next/link"

type Props = {
    user: { name: string } | null,
    toggleMenu: () => void,
    toggleUserMenu: () => void
}

export default function MobileMenu({ user, toggleMenu, toggleUserMenu }: Props) {
    return (
        <div className="fixed inset-0 bg-background-homepage flex flex-col items-center justify-center gap-8 text-default-text font-josefinSlab font-semibold text-[20px] md:hidden transition-opacity duration-300 z-50 mt-[60px]">
            <Link href="/products" onClick={toggleMenu} className="hover:underline">
                Products
            </Link>
            <Link href="/cart" onClick={toggleMenu} className="hover:underline">
                Cart
            </Link>
            {user ? (<Link href="/produtos" onClick={toggleUserMenu}>{user.name}</Link>) : (
                <Link href="/login" onClick={toggleMenu} className="hover:underline" >
                    Login
                </Link>
            )}
        </div>
    )
}