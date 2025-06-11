'use client'

import { createContext, useContext, useState, ReactNode } from "react"


type Product = {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

type CartContextType = {
  cart: Product[];
  addToCart: (product: Omit<Product, 'quantity'>, quantity: number) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  toggleCart: () => void;
  closeCart: () => void;
  isCartOpen: boolean;
}

const CartContext = createContext({} as CartContextType)

export const useCart = () => useContext(CartContext)

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<Product[]>([])
  const [isCartOpen, setIsCartOpen] = useState(false)

  const addToCart = (product: Omit<Product, 'quantity'>, quantity: number) => {
    setCart(prev => {
      const existing = prev.find(p => p.id === product.id)

      if (existing) {
        return prev.map(p =>
          p.id === product.id ? { ...p, quantity: p.quantity + quantity } : p
        )
      }
      return [...prev, { ...product, quantity }]
    })
    setIsCartOpen(true)
  }

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id))
  }

  const updateQuantity = (id: string, quantity: number) => {
    setCart(prev =>
      prev.map(item =>
        item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item
      )
    )
  }

  const toggleCart = () => setIsCartOpen(prev => !prev)

  const closeCart = () => setIsCartOpen(false)

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, updateQuantity, isCartOpen, toggleCart, closeCart }}
    >
      {children}
    </CartContext.Provider>
  )
}
