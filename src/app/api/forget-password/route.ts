import { NextResponse } from "next/server"; 
import nodemailer from 'nodemailer'

export async function POST(res: NextResponse){
    const body = await res.json()
    const { email } = body 

    if(!email){
        return NextResponse.json({message: 'Mandatory e-mail | Email obrigatório'}, {status: 404})
    }

    try{
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth:{
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        })

        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Password recovery | Recuperação de senha',
            html: '<p>English:</p><br /><p>Hello, this email is just a test.</p><br/><p>If you received this email, it means everything went well! :)</p><br /><p>Português:</p><br /><p>Olá, esse email é apenas um teste.</p><br /><p>Se você recebeu esse email, quer dizer que deu tudo certo! :)</p>'
        })

        return NextResponse.json({message: 'Email sent successfully | Email enviado com sucesso'}, {status: 200})
    }catch (err){
        console.log(err)
        return NextResponse.json({ message: 'Error sending email | Erro ao enviar o e-mail' }, { status: 500 })
    }
}