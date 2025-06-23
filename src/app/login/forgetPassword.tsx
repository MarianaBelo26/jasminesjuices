'use client'

type Props = {
    closeModalForgot: () => void,
    handleForgotPass: () => void,
    setEmail: (value: string) => void
}

export default function ForgetPassword({ closeModalForgot, handleForgotPass, setEmail }: Props) {
    return (
        <div className="absolute bg-background-modal-forgot-pass w-screen h-screen z-[90] top-0" onClick={closeModalForgot}>
            <div className="flex flex-col relative bg-background-info-login w-[75%] md:w-[350px] h-[320px] rounded-[10px] top-1/2 left-1/2 translate-[-50%]" onClick={(e) => e.stopPropagation()}>
                <div className="flex flex-row justify-between px-3 pt-3 md:text-[22px]">
                    <h2>Esqueceu a senha?</h2>
                    <span className="cursor-pointer" onClick={closeModalForgot}>X</span>
                </div>
                <form className="p-2 flex flex-col items-center justify-between pb-3 h-[250px] w-[100%] absolute bottom-0 ">
                    <p className="text-[14px] pl-2">Insira seu e-mail e enviaremos um link para redefinir sua senha</p>
                    <span className="relative lef-0 w-[100%] pt-2 text-gray-700 mb-[-10px]">E-mail</span>
                    <input type="email" className="border flex w-[90%] lg:w-[300px] h-[40px] rounded-[10px]" onChange={(e) => setEmail(e.target.value)} />
                    <button type="button" className="border py-[3px] w-[70%] md:w-[260px] h-[40px] rounded-[2px] bg-button-login text-default-text text-center cursor-pointer" onClick={handleForgotPass}>Redefinir senha</button>
                    <button type="button" className="flex flex-row justify-center gap-3 border py-[3px] w-[70%] md:w-[260px] h-[35px] rounded-[2px]  text-center cursor-pointer" onClick={closeModalForgot}>Voltar ao login</button>
                </form>
            </div>
        </div>
    )
}