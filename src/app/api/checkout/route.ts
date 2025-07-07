import { NextApiRequest, NextApiResponse } from "next"
import z from "zod"

const schema = z.object({
    name: z.string().min(3),
    cardNumber: z
            .string()
            .transform((val) => val.replace(/\s/g, ''))
            .refine((val) => /^\d{16}$/.test(val)),
        expiration: z.string().regex(/^\d{2}\/\d{2}$/),
        cvv: z.string().regex(/^\d{3}$/)
})

export default function handler(req: NextApiRequest, res: NextApiResponse){
    if(req.method !== 'POST') return res.status(405)

    try{
        const b
    }
}