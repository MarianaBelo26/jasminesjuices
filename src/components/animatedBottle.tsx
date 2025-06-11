'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

export default function FloatingBottle() {
  return (
    <div className="relative  bg-background-homepage flex items-center justify-center">
      <motion.div
        initial={{ y: 0, x: 0, rotate: 0 }}
        animate={{
          y: [0, -20, 0],
          x: [0, 5, -5, 0],
          rotate: [0, 2, -2, 0]
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
        className="z-10"
      >
        <Image
          src="/img_homepage/caju_homepage_vertical.png"
          alt="Garrafa"
          className="md:w-[150px] h-[280px] md:h-[362px] lg:w-[180px] lg:h-[462px] md:ml-[45px] md:mt-[70px]"
          width={110}
          height={20}
        />
      </motion.div>
    </div>
  )
}
