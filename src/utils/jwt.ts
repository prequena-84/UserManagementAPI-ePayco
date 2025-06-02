import jwt, { JwtPayload, SignOptions } from 'jsonwebtoken';
import keyJWT from '../functions/private.key'

const secreKey = process.env.secretKey || keyJWT()

const generateToken = (userName:string): string => {
    // Establecer el tiempo expiration Token por el .env
    const options: SignOptions = { expiresIn: '20m' } 

    return jwt.sign({ userName }, secreKey, options)
}

const validateToken = (token:string): string | JwtPayload | null => {
    try {
        const decoded = jwt.verify(token, secreKey) as JwtPayload
        return decoded
    } catch( err ) {
        console.error('error en validateToken', err)
        return null //Token invalido
    }
}

export {
    generateToken,
    validateToken,
}