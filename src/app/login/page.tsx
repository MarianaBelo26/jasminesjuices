'use client'

import { signIn } from "next-auth/react"
import { useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"

import RegisterForm from "./registerForm"
import ForgetPassword from "./forgetPassword"

export default function LoginForm() {
  const [isClicked, setIsClicked] = useState<'login' | 'register'>('login')
  const [openModal, setOpenModal] = useState(false)
  const [email, setEmail] = useState('')
  const [pass, setPass] = useState('')
  const [emailError, setEmailError] = useState('')
  const [passError, setPassError] = useState('')

  const router = useRouter()

  const openModalForgot = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    setOpenModal(!openModal)
  }

  const closeModalForgot = () => {
    setOpenModal(!openModal)
  }

  const login = () => {
    setEmailError('')
    setPassError('')

    if (email === '' || pass === '') {
      if (!email) setEmailError('enter your email')
      if (!pass) setPassError('enter your password')
      return
    }

    if (email !== 'test@user.com') {
      setEmailError('invalid email')
      
    }

    if (pass !== '12345678') {
      setPassError('invalid password')
      
    }

    if (email === 'test@user.com' && pass === '12345678') {
      localStorage.setItem('user', JSON.stringify({ name: 'User', email }))

      router.push('/')
      window.location.href = '/'

    }
  }

  const handleForgotPass = async () => {
    try {
      const res = await fetch('/api/forget-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      })

      const data = await res.json()

      if (res.ok) {
        alert(data.message)
      } else {
        alert(`Error: ${data.message}`)
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      alert('Error sending request | Erro ao enviar solicitação')
    }
  }

  return (
    <>
      <main className=" bg-background-login-shop-pages h-[100%] w-screen flex flex-col justify-center items-center pt-20 pb-20">
        <p className="w-[80%] md:w-[40%] text-default-text pb-2 text-center">Test site, copy and paste the data below to log in: | Site teste, copie e cole os dados abaixo para entrar: <br />Email: test@user.com <br /> Password: 12345678</p>
        <div className="bg-background-info-login w-[75%] md:w-[40%] rounded-[10px] pb-[30px]">
          <h2 className="p-6 font-[julius_Sans_One]">Welcome</h2>
          <div className="flex flex-row gap-9 pl-8">
            <button className={`px-1 cursor-pointer ${isClicked === 'login' ? 'border' : 'border-none'}`} onClick={() => setIsClicked('login')}>Login</button>
            <button className={`px-1 cursor-pointer ${isClicked === 'register' ? 'border' : 'border-none'}`} onClick={() => setIsClicked('register')}>Register</button>
          </div>
          <hr className="mx-5 text-gray-300" />
          {isClicked === 'login' && (<div className="login">
            <form autoComplete="on" className="login flex flex-col gap-2 items-center mt-5">
              <div className="border w-[80%] lg:w-[300px]">
                <input type="email" name="login" id="login-iemail" placeholder="Email" autoComplete="email" className="w-[100%]" onChange={(e) => setEmail(e.target.value)} />
                <label htmlFor="login-iemail"></label>
              </div>
              {emailError && (<p className="text-[12px] text-red-500 w-[80%] lg:w-[300px] items-start">{emailError}</p>)}
              <div className="border w-[80%] lg:w-[300px]">
                <input type="password" name="password" id="login-ipassword" placeholder="Password" autoComplete="current-password" className="w-[100%]" onChange={(e) => setPass(e.target.value)} />
                <label htmlFor="login-ipassword"></label>
              </div>
              {passError && (
                <p className="text-[12px] text-red-500 w-[80%] lg:w-[300px] items-start">{passError}</p>
              )}
              <button className="text-[12px] cursor-pointer" onClick={openModalForgot}>Forget password?</button>
              <button
                type="button"
                className="border mt-3 py-[3px] w-[70%] md:w-[260px] rounded-[2px] bg-button-login text-default-text text-center cursor-pointer"
                onClick={login}>Login</button>
              <p className="pt-2 text-center">or</p>
              <button type="button" className=" flex flex-row justify-center gap-3 border py-[3px] w-[70%] md:w-[260px] rounded-[2px]  text-center mt-3 cursor-pointer" onClick={() => signIn('google')}>
                <Image
                  src='/google_icon.png'
                  width={24}
                  height={1}
                  alt='google icon'
                  className="inline"
                />
                Login with Google
              </button>
            </form>
          </div>)}
          {isClicked === 'register' && <RegisterForm signIn={signIn} />}
        </div>
        {openModal && <ForgetPassword closeModalForgot={closeModalForgot} handleForgotPass={handleForgotPass} setEmail={setEmail} />}
      </main>
    </>
  )
}

