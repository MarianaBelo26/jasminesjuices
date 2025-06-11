import Image from "next/image"
import Link from "next/link"


export default function Checkout() {
    return (
        <main className="pt-[75px] flex flex-col items-center text-default-text bg-background-homepage h-[100vh] font-['julius_Sans_One']">
            <h2 className="text-[22px] pb-10 underline">It&apos;s only test e-commerce.</h2>
            <Image
             src="/checkout/img_checkout.png"
             width={210}
             height={20}
             className="lg:w-[290px]"
             alt="caju picture"
             />
             <button className="bg-button-pages w-[200px] text-[18px] px-5 py-2 shadow-[3px_3px_4px_rgba(22,27,6,0.65)] cursor-pointer"><Link href='/'>Home Page</Link></button>
        </main>
    )
}