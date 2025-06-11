'use client'

import { useState } from 'react'
import Image from 'next/image'
import { useCart } from '@/app/context/cartContext'
import { useRouter } from 'next/navigation'

type Product = {
  id: string
  name: string
  image: string
  price: number
  description: string
}

export default function ProductClient({ product }: { product: Product }) {
  const { addToCart, closeCart  } = useCart()
  const [quantity, setQuantity] = useState(1)
  const router = useRouter()

  const handleAddToCart = () => {
    addToCart({ ...product }, quantity)
    const total = product.price * quantity
    console.log(`Adicionado ao carrinho: ${product.name}, quantidade: ${quantity}, total: R$ ${total}`)
  }

  const handleBuyNow = () => {
    addToCart({ ...product }, quantity)
    closeCart()
    router.push('/cart')
  }

  return (
      <main className="bg-background-homepage md:h-[100%] flex flex-row justify-center pb-[30px]">
        <div className="bg-background-info-product w-[95%] h-[85%] md:h-[100%] pt-[80px] md:pb-[50px] flex flex-col items-center md:flex-row">
          <Image
            src={product.image}
            alt={product.name}
            width={350}
            height={400}
            className="rounded-[40px] w-[240px] md:w-[290px] lg:w-[300px] xl:w-[340px] h-auto md:h-[390px] object-cover"
          />
          <div className="flex flex-col md:ml-[50px] items-center md:items-start">
            <h1 className="text-[30px] md:text-[35px] xl:text-[40px] font-['josefin_Sans'] text-highlighted-text pl-[20px] md:pl-0 mb-6 ">
              {product.name}
            </h1>
            <p className="text-center text-highlighted-text font-['julius_Sans_One'] w-[220px] md:w-[390px] lg:w-[560px] xl:w-[620px] lg:text-[20px] xl:text-[26px] mb-5 pr-[5px]">
              {product.description}
            </p>
            <div className="w-[100%] lg:h-[70%] xl:h-[62%] flex flex-col items-center justify-end md:items-end ">
              <span className="flex flex-row items-start w-[100%] text-[22px] lg:text-[35px] font-['julius_Sans_One'] text-highlighted-text mb-4">R$ {product.price}</span>
              <div className="flex items-center gap-1 mb-4 font-['julius_Sans_One'] md:pr-[40px]">
                <span>Quantity</span>
                <div className="border px-5 py-1 flex gap-4">
                  <button onClick={() => setQuantity(prev => Math.max(1, prev - 1))} className="">
                    -
                  </button>
                  <span className="">{quantity}</span>
                  <button onClick={() => setQuantity(prev => prev + 1)} className="">
                    +
                  </button>
                </div>
              </div>
              <button
                className="text-default-text font-['julius_Sans_One'] bg-button-pages text-[14px] lg:text-[20px] w-[200px] lg:w-[330px] h-[35px] lg:h-[45px]  xl:w-[430px] xl:mt-[40px] md:mr-[40px] hover:border hover:border-[#677146] hover:bg-transparent hover:text-highlighted-text cursor-pointer"
                onClick={handleAddToCart}
              >
                Add to Cart
              </button>
              <button
                className="mt-[15px] mb-[10px] border border-[#677146] text-highlighted-text font-['julius_Sans_One'] text-[14px] lg:text-[22px] w-[200px] lg:w-[330px] h-[35px] lg:h-[45px]  xl:w-[430px] md:mr-[40px]  hover:bg-button-pages hover:text-default-text cursor-pointer" onClick={handleBuyNow}
              >
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </main>
    )
}
