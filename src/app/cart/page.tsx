'use client'

import { useCart } from "../context/cartContext"
import Image from "next/image"
import Link from "next/link"
import { FiTrash2 } from "react-icons/fi"
import '../../i18n.tsx'
import { useTranslation } from "react-i18next"

export default function CartPage() {

  const {t} = useTranslation()

  const { cart, removeFromCart, updateQuantity } = useCart()

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0)

  return (
    <main className="min-h-screen p-4 bg-background-login-shop-pages text-default-text font-['julius_Sans_One']">
      <h1 className="text-2xl mb-6 pt-[70px]">{t('cart.title')}</h1>
      {cart.length === 0 ? (
        <p>{t('cart.messageIsEmpty')}</p>
      ) : (
        <div className="space-y-3 max-h-[calc(100vh-250px)] overflow-y-auto pr-2">
          {cart.map(item => (
            <div
              key={item.id}
              className="flex items-center justify-between border-b pb-2 gap-4"
            >
              <div className="flex items-center gap-4">
                <Image
                  src={item.image}
                  alt={item.nameKey}
                  width={60}
                  height={60}
                  className="rounded-full"
                />
                <div>
                  <p className="font-semibold">{t(item.nameKey)}</p>
                  <div className="flex items-center gap-2 mt-2 border w-[100px]">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="px-2 rounded cursor-pointer"
                      disabled={item.quantity <= 1}
                    >
                      -
                    </button>
                    <span className="px-2">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="px-2 rounded cursor-pointer"
                    >
                      +
                    </button>
                  </div>
                  <p className="mt-2">Total: {t('products.coin')} {(item.price * item.quantity).toFixed(2)}</p>
                </div>
              </div>
              <button className="cursor-pointer"
                onClick={() => removeFromCart(item.id)}
                title="Remover item"
              >
                <FiTrash2 size={22} />
              </button>
            </div>
          ))}

          <div className="mt-6 text-right fixed right-0 bottom-0 p-[10px] bg-background-login-shop-pages w-[100vw]">
            <p className="text-xl font-bold">Total: {t('products.coin')} {subtotal.toFixed(2)}</p>
            <p className="text-lg">{t('cart.shipping')}: {t('cart.shippingValue')}</p>

            <Link href="/checkout">
              <button className="mt-4 bg-button-pages text-white px-4 py-2 rounded hover:opacity-90 transition cursor-pointer">
              {t('cart.checkout')}
              </button>
            </Link>
          </div>
        </div>
      )}
    </main>
  )
}
