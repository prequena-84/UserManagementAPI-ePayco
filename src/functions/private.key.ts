import crypto from 'crypto'

export default function keyJWT(): string {
    // randomBytes(3) es el equivalente a 6 digitos de token
    return crypto.randomBytes(3).toString('hex')
}