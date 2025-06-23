"use client"

import { signOut, useSession } from "next-auth/react"
import { useEffect, useState, useRef } from "react"
import { usePathname, useRouter } from "next/navigation"
import { Menu, X } from "lucide-react"
import Link from "next/link"

import NavLinks from "./NavLinks"
import UserMenu from "./UserMenu"
import MobileMenu from "./MobileMenu"

export const Header = () => {
  const pathname = usePathname()
  const router = useRouter()
  
  const { data: session } = useSession()
  const [localUser, setLocalUser] = useState<{ name: string, email: string } | null>(null)
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  const userButtonRef = useRef<HTMLParagraphElement>(null)
  const menuRef = useRef<HTMLDivElement>(null)


  useEffect(() => {
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      setLocalUser(JSON.parse(storedUser))
    }
  }, [])

  const user = session?.user?.name ? { name: session.user.name } : localUser

  const toggleUserMenu = () => {
    if (!user) return
    if (window.innerWidth < 768) {
      router.push("/userpage")
    } else {
      setUserMenuOpen(!userMenuOpen)
    }
  }

  const logout = () => {
    setUserMenuOpen(false)
    setLocalUser(null)
    localStorage.removeItem("user")
    signOut()
  }

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        userMenuOpen &&
        menuRef.current &&
        userButtonRef.current &&
        !menuRef.current.contains(e.target as Node) &&
        !userButtonRef.current.contains(e.target as Node)
      ) {
        setUserMenuOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [userMenuOpen])

  return (
    <nav className="fixed w-full h-[70px] flex justify-between items-center bg-background-homepage px-5 md:px-8 lg:px-16 z-[90]">
      <h2 className="text-[18px] md:text-[25px] lg:text-[30px] font-[josefin_Sans] font-semibold text-highlighted-text">
        <Link href="/">Jasmine&apos;s Juices</Link>
      </h2>
      <div className="md:hidden text-highlighted-text ">
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="cursor-pointer"
          aria-label="Toggle Menu"
        >
          {menuOpen ? <X size={25} /> : <Menu size={25} />}
        </button>
      </div>

      <NavLinks
        pathname={pathname}
        user={user}
        toggleUserMenu={toggleUserMenu}
        userButtonRef={userButtonRef}
      />

      {userMenuOpen && <UserMenu ref={menuRef} logout={logout} />}
      {menuOpen && (
        <MobileMenu
          user={user}
          toggleMenu={() => setMenuOpen(false)}
          toggleUserMenu={toggleUserMenu}
        />
      )}
    </nav>
  )
}
