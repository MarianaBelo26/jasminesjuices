'use client'

import Image from "next/image"
import { useTranslation } from "react-i18next"

export default function Adress() {

    const {t} = useTranslation()

    return (
        <div>
            <Image
                alt=""
                src="/websiteUnderConstruction/imageBR.png"
                width={200}
                height={200}
                className=" "
            />
            <p>
               {t('userpage.buildingPageMessage')}
            </p>
        </div>
    )
}