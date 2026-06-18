'use client'

import { useTranslation } from "react-i18next"

type Props = {
    setActiveTab: (valor: string) => void
    activeTab: string
}


export default function Return({ activeTab, setActiveTab }: Props) {

    const{t} = useTranslation()

    return (
        <div className="flex flex-col gap-5 w-[50%]">
            <div className={`${activeTab === 'return' ? 'font-bold' : ''}`}>
                <button className="hover:underline cursor-pointer font-[julius_Sans_One] text-[20px]" onClick={() => setActiveTab('return')} >{t('orders.returns')}</button>
                <hr className="w-[80%]"/>
            </div>
            {activeTab === 'return' && (<div className="font-[josefin_Slab] text-[20px] w-[68vw] ml-[-100%] ">
                <h3 className="whitespace-pre-wrap">{t('orders.returnsMessage')}</h3>
            </div>)}
        </div>
    )
}