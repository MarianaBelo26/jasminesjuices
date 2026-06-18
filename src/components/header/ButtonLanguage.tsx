'use client'

import { useTranslation } from "react-i18next"
import Image from "next/image"
import { forwardRef} from "react"

type Props = {
    toggleLanguageMenu: () => void
    languageMenu: boolean
}

const ButtonLanguage = forwardRef<HTMLDivElement, Props>(({toggleLanguageMenu, languageMenu}, ref) => {

    const {i18n} = useTranslation()

    const language = (lang: string) =>{
        i18n.changeLanguage(lang)
        return toggleLanguageMenu() 
    }

    return (
        <div ref={ref}>
            <button className="md:mt-1 lg:mt-2 cursor-pointer" onClick={toggleLanguageMenu}>
                <Image
                    src="/language_nav/globe.png"
                    alt="Logo Globe"
                    className="h-[22px] w-[22px] md:w-[25px] md:h-[25px] md:invert"
                    width={28}
                    height={28}
                />
            </button>
            {languageMenu && (
                <div  className={` flex flex-col items-center justify-center gap-3 w-[150px] h-[100px] absolute right-3 top-[70px] z-50 rounded-[10px] bg-border-user-menu shadow-md`}>
                    <button onClick={()=>language('pt')} 
                     type="button"
                     className="pt hover:bg-hover-menu-user hover:text-default-text w-[100%] h-[35px] text-center cursor-pointer">
                        Português
                    </button>
                    <button onClick={()=>language('en')} className="en hover:bg-hover-menu-user hover:text-default-text w-[100%] h-[35px] text-center cursor-pointer">
                        English
                    </button>
                </div>
            )}

        </div>
    )
})


ButtonLanguage.displayName = 'ButtonLanguage'
export default ButtonLanguage
