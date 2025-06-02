import crypto from 'crypto'

export default function keyJWT(): string {
    // randomBytes(3)
    return crypto.randomBytes(3).toString('hex')
}