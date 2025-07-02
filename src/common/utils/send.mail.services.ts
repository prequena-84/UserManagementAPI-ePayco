import * as nodemailer from 'nodemailer'
import { MailOptions } from 'src/config/mail.config'
import type { TName, TEmail } from 'src/typescript/types/users/user.type'
import type { TToken } from 'src/typescript/types/token/token.types'

export class MailServices {
    constructor( private readonly mailOptions:MailOptions ) {}

    async send(to:TEmail, name:TName, token:TToken ): Promise<string> {
        const transporter = nodemailer.createTransport(this.mailOptions.configTransporter())
        const opcionMail = {
            from: this.mailOptions.configTransporter().auth.user,
            to,
            subject:"Verificación de Correo",
            html: this.mailOptions.configEmail(name,token),
        }

        try {
            const sendMail = await transporter.sendMail(opcionMail)
            return `Se envio el mail con el token sastifactoriamente`
        } catch(err) {
            return `ocurrio este error : ${err}`
        }
    }
}