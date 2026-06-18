'use client'

import Image from "next/image"
import Link from "next/link"
import '../../i18n.tsx'
import { useTranslation } from "react-i18next"

type Props = {
    signIn: (value: string) => void
}

export default function RegisterForm({signIn}: Props){

  const {t} = useTranslation()

    return(
        <div className="checkin">
            <form autoComplete="on" className="checkin flex flex-col gap-2 items-center mt-5">
              <div className="border w-[80%] lg:w-[300px]">
                <input type="text" name="name" id="register-iname" placeholder={t('login.name')} autoComplete="name" className="w-[100%]" />
                <label htmlFor="register-iname"></label>
              </div>
              <div className="border w-[80%] lg:w-[300px]">
                <input type="email" name="login" id="register-iemail" placeholder="Email" autoComplete="email" className="w-[100%]" />
                <label htmlFor="register-iemail"></label>
              </div>
              <div className="border w-[80%] lg:w-[300px]">
                <input type="password" name="password" id="register-ipassword" placeholder={t('login.password')} autoComplete="current-password" className="w-[100%]" />
                <label htmlFor="register-ipassword"></label>
              </div>
              <Link href="/"><button type="button" className="border mt-3 py-[3px] w-[52vw] md:w-[260px]   rounded-[2px] bg-button-login text-default-text text-center cursor-pointer">{t('login.createAccount')}</button></Link>
              <button type="button" className=" flex flex-row justify-center gap-3 border py-[3px] w-[70%] md:w-[260px] rounded-[2px]  text-center mt-3 cursor-pointer" onClick={() => signIn('google')}>
                <Image
                  src='/google_icon.png'
                  width={24}
                  height={1}
                  alt='google icon'
                  className="inline"
                />
                {t('login.buttonLoginGoogle')}
              </button>
            </form>
          </div>
    )
}