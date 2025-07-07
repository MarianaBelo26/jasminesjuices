export default function isValidCardNumber(number: string):boolean {
        const clean = number.replace(/\D/g, '')

        let sum = 0
        let shouldDouble = false

        for(let i = clean.length - 1; i >=0; i--){
            let digit = parseInt(clean[i])

            if(shouldDouble){
                digit *= 2
                if(digit > 9) digit -= 9
            }

            sum += digit
            shouldDouble = !shouldDouble
        }
        return sum % 10 === 0
    }