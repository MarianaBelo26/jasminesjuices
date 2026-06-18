'use client'


import { useState } from 'react'
import ButtonOrders from './orders/page'
import ButtonReturn from './return/page'



export default function Orders() {
    const [activeTab, setActiveTab] = useState('')

    return (
        <div className="flex flex-row pt-6">
            <div className="flex flex-col gap-15">
                <h2 className="text-[25px] font-['julius_Sans_One']">pedidos e devoluções</h2>
                <div className="flex flex-rowjustify-center w-[55vw] md:w-[68vw]" >
                    <ButtonOrders setActiveTab={setActiveTab} activeTab={activeTab} />
                    <ButtonReturn setActiveTab={setActiveTab} activeTab={activeTab} />
                </div>
            </div>
        </div>
    )
}