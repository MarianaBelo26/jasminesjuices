"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";

export default function RotatingMovingImage() {
  const [scrollY, setScrollY] = useState(0);
  const [stopPosition, setStopPosition] = useState(500);

  const targetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    const updateStopPosition = () => {
      if (targetRef.current) {
        const rect = targetRef.current.getBoundingClientRect();
        const offsetTop = rect.top + window.scrollY;
        setStopPosition(offsetTop - 150);
      }
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", updateStopPosition);
    updateStopPosition(); // Atualiza ao montar

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", updateStopPosition);
    };
  }, []);

  const clampedScroll = Math.min(scrollY, stopPosition);
  const translateY = clampedScroll * 0.6;
  const rotation = (clampedScroll / stopPosition) * -90;

  return (
    <>
      <div className="relative h-[100vh] flex justify-center items-center overflow-hidden z-[1000] pointer-events-none">
        <Image
          src="/img_homepage/caju_homepage_horizontal.png"
          alt="Juice Bottle"
          width={210}
          height={300}
          className="transition-transform duration-300 ease-out will-change-transform md:w-[415px] lg:w-[590px]"
          style={{
            transform: `translateY(${translateY}px) rotate(${rotation}deg)`,
          }}
        />
      </div>

      <div ref={targetRef}></div>
    </>
  );
}
