'use client'

import { useCart } from "../context/cartContext"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import isValidCardNumber from "./isValidCardNumber"
import '../../i18n.tsx'
import { useTranslation } from "react-i18next"


const schema = z.object({
    personName: z.string().min(3, 'Digite um nome válido | Insert a true name'),
    lastName: z.string().min(3, 'Digite um sobrenome válido| Insert a true last name'),
    adress: z.string().min(3, 'Digite um endereço válido| Insert a true adress'),
    state: z.string().min(2, 'Digite um estado válido| Insert a true state'),
    city: z.string().min(3, 'Digite uma cidade válida| Insert a true city'),
    postalCode: z.string().regex(/^\d{8}$/, 'Digite um CEP válido | Insert a true postal code'),
    number: z.string().min(1, 'Digite um número válido | Insert a true number').max(6, 'Digite um número válido| Insert a true number'),
    phone: z.string().regex(/^\(\d{2}\)\d{5}-\d{4}$/, 'Digite um telefone válido | Insert a true phone'),

    cardName: z.string().min(3, 'Digite um nome válido | Insert a true name'),
    cardNumber: z
        .string()
        .min(1, 'Digite um número de cartão válido | Insert a true card number')
        .transform((val) => val.replace(/\s/g, ''))
        .refine((val) => /^\d{16}$/
        .test(val.replace(/\s/g, '')), 'Digite um número de cartão válido | Insert a true card number')
        .refine((val) => isValidCardNumber(val), 'Número do cartão inválido | Invalid card number'),
    expiration: z
        .string()
        .regex(/^\d{2}\/\d{2}$/, 'Digite uma data de validade válida | Insert a true expirat.')
        .refine((val) =>{
            const [mm, yy] = val.split('/').map(Number)
            if(mm < 1 || mm > 12) return false
            const now = new Date()
            const currentYear = now.getFullYear() % 100
            const currentMonth = now.getMonth() + 1
            return yy > currentYear || (yy === currentYear && mm >= currentMonth)
        }, 'Data de validade expirada | Invalid expiration date'),
    cvv: z.string().regex(/^\d{3}$/, 'Digite um cvv válido | Insert a true cvv')
})


type FormData = z.infer<typeof schema>

export default function Checkout() {

    const {t} = useTranslation()

    const { cart } = useCart()

    const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0)

    const [postalCode, setpostalCode] = useState('')
    const [adress, setAdress] = useState('')
    const [city, setCity] = useState('')
    const [state, setState] = useState('')
    const [cardNumber, setCardNumber] = useState('')
    const [expirationCard, setExpirationCard] = useState('')
    const [cvvNumber, setCvvNumber] = useState('')
    const [phone, setPhone] = useState('')
    const [widthScreen, setWidthScreen] = useState(false)


    const {
        register,
        handleSubmit,
        formState: { errors },
        trigger,
        setValue,
    } = useForm<FormData>({
        resolver: zodResolver(schema)
    })

    const formatCardNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value.replace(/\D/g, '')
        value = value.slice(0, 16)
        value = value.replace(/(\d{4})(?=\d)/g, '$1 ')

        setCardNumber(value)
        setValue('cardNumber', value)
    }

    const expirationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value.replace(/\D/g, '')

        if (value.length > 2) {
            value = value.slice(0, 2) + '/' + value.slice(2, 4)
        }

        setExpirationCard(value)
        setValue('expiration', value)
    }

    const cvvChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value.replace(/\D/g, '')
        value = value.slice(0, 3)

        setCvvNumber(value)
        setValue('cvv', value)
    }

    const formatPhone = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value.replace(/\D/g, '')
        value = value.slice(0, 14)

        if (value.length > 2) {
            value = '(' + value.slice(0, 2) + ')' + value.slice(2, 7) + '-' + value.slice(7, 11)
        }

        setPhone(value)
        setValue('phone', value)
    }


    const onSubmit = (data: FormData) => {
        console.log(data)
        alert('Simulação de checkout concluída | Checkout completed simulation')
    }

    const searchpostalCode = async (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value.replace(/\D/g, '')
        value = value.slice(0, 8)
        setpostalCode(value)
        setValue('postalCode', value)

        if (value.length === 8) {
            try {
                const res = await fetch(`https://viacep.com.br/ws/${value}/json/`)
                const data = await res.json()

                if (!data.error) {
                    setAdress(data.logradouro || '')
                    setCity(data.localidade || '')
                    setState(data.uf || '')

                    setValue('adress', data.logradouro || '')
                    setValue('city', data.localidade || '')
                    setValue('state', data.uf || '')

                    trigger(['adress', 'city', 'state'])
                }

            } catch (error) {
                console.error(error)
            }
        }
    }

    useEffect(() => {
        setWidthScreen(window.innerWidth > 768)

        const handleResize = () => {
            setWidthScreen(window.innerWidth > 768)
        }

        window.addEventListener('resize', handleResize)

        return () => window.removeEventListener('resize', handleResize)
    }, [])

    useEffect(() => {
        setTimeout(() => {
            trigger()
        }, 50)
    }, [trigger, errors])

    return (
        <main className="pt-[75px] flex flex-col items-center text-default-text bg-background-homepage h-[100%] w-[100%] font-['julius_Sans_One'] "> <h2 className="bg-highlighted-text m-3">{t('checkout.messageSiteTest')}</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col lg:flex-row lg:w-[90vw] lg:justify-between">
                {!widthScreen && (
                    <div>
                        <div className="flex justify-between">
                            <p>{t('cart.subtotal')}:</p>
                            <p>{t('products.coin')} {subtotal.toFixed(2)}</p>
                        </div>
                        <div className="flex justify-between">
                            <p className="">{t('cart.shipping')}:</p>
                            <p>{t('cart.shippingValue')}</p>
                        </div>
                        <div className="flex justify-between font-bold">
                            <p>Total:</p>
                            <p>{t('products.coin')} {subtotal.toFixed(2)}</p>
                        </div>
                    </div>
                )}
                <div>
                    <hr className={`text-default-text my-4 md:w-[442px] ${widthScreen ? 'hidden' : 'flex'}`} />
                    <section className="flex flex-col w-[300px] md:w-[442px] lg:w-[650px] text-[14px] md:text-[16px]">
                        <h2 className="pl-10 pt-2 md:pl-0 lg:text-[22px]">{t('checkout.deliveryAdress')}</h2>
                        <div className="flex flex-col">
                            <span className="text-[12px] p-2">{t('checkout.required')}</span>
                            <div className="flex justify-around md:justify-between md:pl-2">
                                <label htmlFor="name" className="flex flex-col text-[12px] lg:text-[16px]">{t('checkout.name')}*
                                    <input {...register('personName')} className="border rounded-[3px] h-[30px] w-[130px] md:w-[200px] lg:w-[300px]" autoComplete="personName" />
                                    {errors.personName && <p className="text-red-700 text-[10px]">{errors.personName.message}</p>}
                                </label>
                                <label htmlFor="sobrenome" className="flex flex-col text-[12px] lg:text-[16px]">{t('checkout.lastName')}*
                                    <input {...register('lastName')} className="border rounded-[3px] h-[30px] w-[130px] md:w-[200px] lg:w-[300px]" autoComplete="sobrenome" />
                                    {errors.lastName && <p className="text-red-700 text-[10px]">{errors.lastName.message}</p>}
                                </label>
                            </div>
                            <label htmlFor="codigo-postal" className="pt-3 pl-[10px] text-[12px] lg:text-[16px] flex flex-col">{t('checkout.postalCode')}*
                                <input {...register('postalCode')} placeholder="00000000" className="border w-[100px] lg:w-[300px] rounded-[3px] h-[30px] text-[16px]" value={postalCode} onChange={searchpostalCode} autoComplete="postalCode" />{errors.postalCode && <p className="text-red-700 text-[10px]">{errors.postalCode.message}</p>}
                            </label>
                            <label htmlFor="Endereço" className="pt-3 pl-[10px] text-[12px] lg:text-[16px] flex flex-col">{t('checkout.adress')}*
                                <input {...register('adress')} className="border rounded-[3px] h-[30px] w-[200px] lg:w-[300px]" value={adress} onChange={(e) => setAdress(e.target.value)} autoComplete="adress" />{errors.adress && <p className="text-red-700 text-[10px]">{errors.adress.message}</p>}
                            </label>
                            <label htmlFor="number" className="pt-3 pl-[10px] text-[12px] lg:text-[16px] flex flex-col">{t('checkout.number')}*
                                <input {...register('number')} className="border rounded-[3px] h-[30px] w-[130px] lg:w-[300px]" autoComplete="number" />
                                {errors.number && <p className="text-red-700 text-[10px]">{errors.number.message}</p>}
                            </label>
                            <div className="flex justify-around md:justify-between md:pl-2">
                                <label htmlFor="estado" className="pt-3 text-[12px] lg:text-[16px] flex flex-col">{t('checkout.state')}*
                                    <input {...register('state')} className="border rounded-[3px] h-[30px] w-[130px] md:w-[200px] lg:w-[300px]" value={state} onChange={(e) => setState(e.target.value)} autoComplete="state" />{errors.state && <p className="text-red-700 text-[10px]">{errors.state.message}</p>}
                                </label>
                                <label htmlFor="cidade" className="pt-3 text-[12px] lg:text-[16px] flex flex-col">{t('checkout.city')}*
                                    <input {...register('city')} className="border rounded-[3px] h-[30px] w-[130px] md:w-[200px] lg:w-[300px]" value={city} onChange={(e) => setCity(e.target.value)} autoComplete="city" />{errors.city && <p className="text-red-700 text-[10px]">{errors.city.message}</p>}
                                </label>
                            </div>
                            <label htmlFor="phone" className="pt-3 pl-[10px] text-[12px] lg:text-[16px] flex flex-col">{t('checkout.phone')}*
                                <input {...register('phone')} className="border rounded-[3px] h-[30px] w-[130px] lg:w-[300px]" value={phone} onChange={formatPhone} autoComplete="phone" />{errors.phone && <p className="text-red-700 text-[10px]">{errors.phone.message}</p>}
                            </label>
                        </div>
                    </section>
                    <hr className="text-default-text w-[90vw] md:w-[442px] my-4 lg:my-9" />
                    <section className="flex flex-col w-[300px] md:w-[442px] lg:w-[650px] text-[14px] md:text-[16px]">
                        <h2 className="pl-10 pt-2 md:pl-0 lg:text-[22px]">{t('checkout.payment')}</h2>
                        <p className="pt-5 text-[12px] lg:text-[16px]">{t('checkout.method')}*</p>
                        <div className="w-[300px]">
                            <span className=" flex justify-around ">
                                <label htmlFor="credit" className='credit-debit'>
                                    <input type="radio" name="pay" id="ipay" className='pay' /> {t('checkout.credit')}
                                </label>
                                <label htmlFor="debit" className='credit-debit'>
                                    <input type="radio" name="pay" id="ipay" className='pay' /> {t('checkout.debit')}
                                </label>
                            </span>
                            <label htmlFor="holder" className="pt-3 pl-[15px] flex flex-col">{t('checkout.name')}*
                                <input {...register('cardName')} placeholder="Nome" className="border rounded-[3px] h-[30px] w-[210px] lg:w-[300px]" autoComplete="cardName" />
                                {errors.cardName && <p className="text-red-700 text-[10px]">{errors.cardName.message}</p>}
                            </label>
                            <label htmlFor="card-number" className="pt-3 pl-[15px] flex flex-col">{t('checkout.cardNumber')}*
                                <input {...register('cardNumber')} value={cardNumber}
                                    onChange={formatCardNumber} placeholder="0000 0000 0000 0000" className="border rounded-[3px] h-[30px] w-[210px] lg:w-[300px]" autoComplete="cardNumber" />
                                {errors.cardNumber && <p className="text-red-700 text-[10px]">{errors.cardNumber.message}</p>}
                            </label>
                            <div className="flex justify-around md:justify-between md:pl-4 md:w-[442px] lg:w-[650px]">
                                <label htmlFor="expiration-date" className="pt-3 flex flex-col">{t('checkout.expirationDate')}*
                                    <input {...register('expiration')} value={expirationCard} onChange={expirationChange}
                                        placeholder="MM/AA" className="border rounded-[3px] h-[30px] w-[130px] md:w-[150px] lg:w-[300px]" autoComplete="expiration" />{errors.expiration && <p className="text-red-700 text-[10px]">{errors.expiration.message}</p>}
                                </label>
                                <label htmlFor="cvv" className="pt-3 flex flex-col">{t('checkout.cvv')}*
                                    <input {...register('cvv')} value={cvvNumber} onChange={cvvChange} placeholder="123" className="border rounded-[3px] h-[30px] w-[130px] md:w-[150px] lg:w-[300px]" autoComplete="cvv" />{errors.cvv && <p className="text-red-700 text-[10px]">{errors.cvv.message}</p>}
                                </label>
                            </div>
                        </div>
                    </section>
                    <hr className={`text-default-text w-[90vw] md:w-[442px] my-6`} />
                </div>
                <div>
                    <div className="flex flex-col w-[280px] md:w-[442px] text-[14px] md:text-[20px] lg:w-[300px] lg:pt-9">
                        <div className="flex justify-between">
                            <p className="">{t('cart.subtotal')}:</p>
                            <p>{t('products.coin')} {subtotal.toFixed(2)}</p>
                        </div>
                        <div className="flex justify-between">
                            <p className="">{t('cart.shipping')}:</p>
                            <p>{t('cart.shippingValue')}</p>
                        </div>
                        <div className="flex justify-between font-bold">
                            <p>Total:</p>
                            <p>{t('products.coin')} {subtotal.toFixed(2)}</p>
                        </div>

                        <button type="submit" className="mt-8 mb-5 h-[40px]  text-center px-[11px] rounded-[4px] cursor-pointer bg-highlighted-text" >{t('checkout.placeOrder')}</button>
                    </div>
                </div>
            </form>


        </main>
    )
}