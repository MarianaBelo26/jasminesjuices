import type { Metadata } from "next";
import { Julius_Sans_One, Josefin_Slab, Josefin_Sans } from "next/font/google";

import "./globals.css";
import { Header } from "@/components/header/Header"
import { CartProvider } from "./context/cartContext"
import CartSidebar from "./cart/cartSidebar/cartSidebar"

const juliusSansOne = Julius_Sans_One({
  subsets: ["latin"],
  weight: "400",
  style: "normal",
  display: "swap",
  variable: '--font-julius-sans-one'
})

const josefinSlab = Josefin_Slab({
  subsets: ["latin"],
  variable: '--font-josefin-slab'
})

const josefinSans = Josefin_Sans({
  subsets: ["latin"],
  variable: '--font-josefin-sans'
})

export const metadata: Metadata = {
  title: " Jasmine's Juices",
  description: "Discover the authentic taste of Brazil with our 100% natural juices, made from fresh fruits and carefully selected ingredients. Handcrafted, healthy, and sustainable juices, perfect for those who seek health and flavor in every sip.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${juliusSansOne.variable} ${josefinSlab.variable} ${josefinSans.variable} antialiased`}
      >
        <CartProvider>
          <Header />
          {children}
          <CartSidebar/>
        </CartProvider>
      </body>
    </html>
  );
}
