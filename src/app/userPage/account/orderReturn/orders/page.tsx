'use client'

import { useTranslation } from "react-i18next"

type Props = {
    setActiveTab: (valor: string) => void
    activeTab: string
}

export default function Orders({ activeTab, setActiveTab }: Props) {

    const {t} = useTranslation()

    return (
        <div className="flex flex-col gap-5 w-[50%]">
            <div className={`${activeTab === 'order' ? 'font-bold' : ''}`}>
                <button className="hover:underline cursor-pointer font-[julius_Sans_One] text-[20px]" onClick={() => setActiveTab('order')} >{t('orders.orders')}</button>
                <hr className="w-[80%]"/>
            </div>
            {activeTab === 'order' && (<div className="font-[josefin_Slab] text-[20px] w-[68vw]">
                {t('orders.ordersMessage')}
            </div>)}
        </div>
    )
}