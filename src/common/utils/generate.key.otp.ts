import * as crypto from 'crypto'

export default function generateKeyOTP(): string {
    return crypto.randomBytes(3).toString('hex')
}