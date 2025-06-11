"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";


export const Header = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="fixed w-full h-[70px] flex justify-between items-center bg-background-homepage px-5 md:px-8 lg:px-16 z-[999]">
      <h2 className="text-[18px] md:text-[25px] lg:text-[30px] font-[josefin_Sans] font-semibold text-highlighted-text">
        <Link href="/">Jasmine&apos;s Juices</Link>
      </h2>

      <div className="md:hidden text-highlighted-text ">
        <button onClick={toggleMenu} className="cursor-pointer" aria-label="Toggle Menu">
          {isOpen ? <X size={25} /> : <Menu size={25} />}
        </button>
      </div>

      <ul className="hidden md:flex gap-4 md:gap-8 lg:gap-12 font-['josefin_Slab'] font-semibold text-[16px] md:text-[23px] lg:text-[30px] text-default-text cursor-pointer">
        <li className="relative group overflow-hidden">
          <Link href="/products" className="active:opacity-50 transition-opacity">
            Products
          </Link>
          <span
            className={`absolute left-0 bottom-0 w-full h-[1px] bg-default-text transition-transform duration-300 ${
              pathname === "/products" ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
            }`}
          ></span>
        </li>
        <li className="relative group overflow-hidden">
          <Link href="/cart" className="active:opacity-50 transition-opacity">
            Cart
          </Link>
          <span
            className={`absolute left-0 bottom-0 w-full h-[1px] bg-default-text transition-transform duration-300 ${
              pathname === "/cart" ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
            }`}
          ></span>
        </li>
      </ul>

      {isOpen && (
        <div className="fixed inset-0 bg-background-homepage flex flex-col items-center justify-center gap-8 text-default-text font-josefinSlab font-semibold text-[20px] md:hidden transition-opacity duration-300 z-50 mt-[60px]">
          <Link href="/products" onClick={toggleMenu} className="hover:underline">
            Products
          </Link>
          <Link href="/cart" onClick={toggleMenu} className="hover:underline">
            Cart
          </Link>
        </div>
      )}
    </nav>
  );
};
