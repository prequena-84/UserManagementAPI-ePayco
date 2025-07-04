import * as nodemailer from 'nodemailer'
import { Injectable } from '@nestjs/common';
import { ConfigEmailService } from 'src/config/email/email.service';
import type { TName, TEmail } from 'src/typescript/types/users/user.type'
import type { TToken } from 'src/typescript/types/token/token.types'

@Injectable()
export class EmailService {
    constructor( private readonly mailOptions:ConfigEmailService ) {};

    async send(to:TEmail, name:TName, token:TToken ): Promise<string> {
        const transporter = nodemailer.createTransport(this.mailOptions.configTransporter());
        const opcionMail = {
            from: this.mailOptions.configTransporter().auth.user,
            to,
            subject:"Verificación de Correo",
            html: this.mailOptions.configEmail(name,token),
        };

        try {
            const sendMail = await transporter.sendMail(opcionMail);       
            return `Se envio el mail con el token sastifactoriamente`;
        } catch(err) {
            return `No se envio el mail, ${err}`
        };
    };
};