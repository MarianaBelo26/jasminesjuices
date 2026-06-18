'use client'

import Link from "next/link"
import Image from "next/image"
import AnimatedBottle from "@/components/animatedBottle"
import PageContacts from "@/components/contacts/PageContacts"
import '../i18n'
import { useTranslation } from "react-i18next"

export default function PageHome() {

  const {t} = useTranslation()

  return (
    <>
      <main className="bg-background-homepage h-[100vh] w-full">
        <div className="welcome flex flex-col items-center justify-center h-[100vh]">
          <h1 className="font-['josefin_Slab'] font-bold text-default-text italic text-[28px] md:text-[55px] lg:text-[65px] mt-[72px]">{t('homepage.title')}</h1>
          <Image
            loading="lazy"
            src="/img_homepage/caju_homepage_horizontal.png"
            width={210}
            height={20}
            className="md:w-[415px] lg:w-[390px]"
            alt="caju juice picture"
          />
          <p className="font-['josefin_Slab'] text-[20px] md:text-[38px] lg:text-[40px] text-default-text font-thin mb-[50px] ">{t('homepage.subtitle')}</p>
          <button className="bg-button-pages text-default-text text-[15px] md:text-[22px] lg:text-[30px] font-['julius_Sans_One'] w-[183px] md:w-[373px] lg:w-[430px] h-[36px] md:h-[53px] lg:h-[55px] shadow-[3px_3px_4px_rgba(22,27,6,0.65)] rounded-[10px]"><Link href='/products'>{t('homepage.buttonBuy')}</Link></button>
        </div>
        <div className="our-story bg-background-homepage flex flex-col md:flex-row items-center md:justify-between">
          <div>
            <AnimatedBottle />
          </div>
          <div className="story flex flex-col w-[90%] md:w-[60%]">
            <h2 className=" text-center text-[25px] md:text-[35px] lg:text-[50px] font-['julius_sans_one'] text-highlighted-text">{t('homepage.titleStory')}</h2>
            <p className="whitespace-pre-wrap text-start font-['josefin_Sans'] text-[12px] md:text-[16px] lg:text-[18px] text-highlighted-text">{t('homepage.ourStory')}</p>
          </div>
        </div>
        <div className="product-sample flex flex-col bg-background-homepage justify-evelyn overflow-hidden">
          <h2 className="flex font-[julius_Sans_One] text-[25px] md:text-[35px] lg:text-[50px] text-default-text mt-[80px] ml-[30px]">{t('homepage.titleItems')}</h2>
          <div className="images_preview_products flex flex-col md:flex-row w-[200px] md:w-[840px] lg:w-[1080px] xl:gap-15 xl:w-[1350px] relative left-[50%] -translate-x-1/2 gap-3">
            <Image
              loading="lazy"
              src="/juices_img/caju.png"
              width={200}
              height={20}
              className=" lg:w-[280px] xl:w-[340px] h-[290px] md:h-[320px] lg:h-[410px] xl:h-[510px] md:ml-[55px] md:mt-[90px] rounded-[170px]"
              alt="caju juice picture"
            />
            <Image
              loading="lazy"
              src="/juices_img/caldo_de_cana.png"
              width={200}
              height={20}
              className="lg:w-[280px] xl:w-[340px] h-[290px]  md:h-[320px] lg:h-[410px] xl:h-[510px] md:ml-[55px] md:mt-[90px] rounded-[170px]"
              alt="caldo de cana juice picture"
            />
            <Image
              loading="lazy"
              src="/juices_img/pitaya.png"
              width={200}
              height={20}
              className="lg:w-[280px] xl:w-[340px] h-[290px] md:h-[320px] lg:h-[410px] xl:h-[510px] md:ml-[55px] md:mt-[90px] rounded-[170px]"
              alt="dragon fruit juice picture"
            />
          </div>
          <button className="mt-[80px] mb-[60px] relative left-[50%] -translate-x-1/2 bg-button-pages text-default-text text-[15px] md:text-[22px] lg:text-[32px] font-['julius_Sans_One'] w-[183px] md:w-[373px] lg:w-[503px] h-[36px] md:h-[53px] lg:h-[63px] shadow-[3px_3px_4px_rgba(22,27,6,0.65)] rounded-[10px]"><Link href='/products'>{t('homepage.buttonAllProducts')}</Link></button>
        </div>
        <PageContacts></PageContacts>
      </main>
    </>
  );
}
