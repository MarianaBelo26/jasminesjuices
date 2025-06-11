'use client';

import Image from "next/image";
import { useRouter } from "next/navigation";
import { products } from "@/data/products";
import { useCart } from "../context/cartContext";


export default function PageProducts() {
    const router = useRouter()

    const { addToCart } = useCart()

    const handleAddToCart = (id: string) => {
      const product = products.find(p => p.id === id);
      if (product) {
        addToCart(product, 1);
      }
    }

  return (
    <main className="w-full bg-background-homepage flex flex-col items-center px-4">
      <h2 className="mt-[90px] font-['julius_Sans_One'] text-highlighted-text text-[25px] md:text-[35px] lg:text-[45px] xl:text-[55px]">
        Products
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8 justify-items-center">
        {products.map((prod) => (
          <div key={prod.id} className="text-center group relative">
            <Image
              src={prod.image}
              width={200}
              height={200}
              alt={prod.name}
              onClick={() => router.push(`/products/${prod.id}`)}
              className="w-[135px] md:w-[235px] xl:w-[324px] h-[230px] md:h-[350px] lg:h-[396px] xl:h-[486px] object-cover rounded-[170px] mx-auto cursor-pointer"
            />

            <div className="hidden lg:group-hover:flex flex-col gap-2 items-center justify-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black/81 p-4 rounded-[170px] w-[235px] xl:w-[292px] lg:h-[396px] xl:h-[486px] shadow-lg">
              <h2 className="font-['josefin_Sans'] text-[24px] text-default-text" >{prod.name}</h2>
              <p className="font-['julius_Sans_One'] text-[20px] text-default-text">R$ {prod.price}</p>
              <button
                onClick={() => router.push(`/products/${prod.id}`)}
                className="mt-[80px] text-default-text font-['julius_Sans_One'] bg-button-pages text-[16px] w-[238px] h-[30px] rounded-[20px] hover:border hover:border-[#677146] hover:bg-transparent hover:text-default-text cursor-pointer "
              >
                View Product
              </button>
              <button
                onClick={() => handleAddToCart(prod.id)}
                className="border border-[#677146] text-default-text font-['julius_Sans_One'] text-[16px] w-[238px] h-[30px] rounded-[20px] hover:bg-button-pages hover:text-default-text cursor-pointer"
              >
                Buy Now
              </button>
            </div>

            <div className="lg:hidden mt-2">
              <h2 className="font-['josefin_Slab'] text-[18px] font-semibold text-default-text">{prod.name}</h2>
              <p className="font-['julius_Sans_One'] text-[14px] text-default-text">R$ {prod.price}</p>
              <button
                onClick={() => handleAddToCart(prod.id)}
                className="border border-[#677146] text-default-text font-['julius_Sans_One'] text-[16px] w-[140px] h-[30px] rounded-[20px] mt-[10px] hover:bg-button-pages hover:text-default-text cursor-pointer"
              >
                Adicionar
              </button>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}