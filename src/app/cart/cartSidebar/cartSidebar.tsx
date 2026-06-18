'use client'

import { useCart } from "../../context/cartContext"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useRef } from "react"
import '../../../i18n.tsx'
import { useTranslation } from "react-i18next"

export default function CartSidebar() {

  const {t} = useTranslation()

  const { cart, isCartOpen, toggleCart } = useCart()
  const sidebarRef = useRef<HTMLDivElement>(null)

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node)
      ) {
        toggleCart()
      }
    }

    if (isCartOpen) {
      document.addEventListener("mousedown", handleClickOutside)
    } else {
      document.removeEventListener("mousedown", handleClickOutside)
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isCartOpen, toggleCart])

  return (
    <aside
      ref={sidebarRef}
      className={`fixed top-[70px] right-0 h-full w-[300px] text-default-text font-['julius_Sans_One'] bg-background-login-shop-pages z-50 transform transition-transform duration-300 ${isCartOpen ? 'translate-x-0' : 'translate-x-full'}`}
    >
      <div className="flex justify-between items-center p-2  border-b">
        <h2 className="text-xl">{t('cart.titleCartSideBar')}</h2>
        <button className="text-[25px] cursor-pointer" onClick={toggleCart}>&times;</button>
      </div>
      <div className="p-4 space-y-4 overflow-y-auto max-h-[calc(100vh-250px)]">
        {cart.map(item => (
          <div key={item.id} className="flex items-center gap-4">
            <Image src={item.image} alt={item.nameKey} width={50} height={50} className="rounded-[170px]" />
            <div>
              <p>{t(item.nameKey)}</p>
              <p>{t('products.quantity')}: {item.quantity}</p>
              <p>{t('products.coin')} {(item.price * item.quantity).toFixed(2)}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="p-4 border-t">
        <p className="font">{t('cart.subtotal')}: {t('products.coin')} {subtotal.toFixed(2)}</p>
        <Link href="/cart">
          <button className="mt-6 w-full bg-button-pages text-white p-2 cursor-pointer" onClick={toggleCart}>{t('cart.viewCart')}</button>
        </Link>
      </div>
    </aside>
  )
}
