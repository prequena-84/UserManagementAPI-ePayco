import * as nodemailer from 'nodemailer'
import { Injectable } from '@nestjs/common';
import { ConfigEmailRepository } from 'src/config/email/infrastructure/repositories/email.repository';

@Injectable()
export class EmailRepository {
    constructor( 
        private readonly mailOptions:ConfigEmailRepository, 
    ) {};
    async send(to:string, name:string, token:string ): Promise<string> {
        const transporter = nodemailer.createTransport(this.mailOptions.configTransporter());
        const opcionMail = {
            from: this.mailOptions.configTransporter().auth.user,
            to,
            subject:"Verificación de Correo",
            html: this.mailOptions.configEmail(name,token),
        };       
        await transporter.sendMail(opcionMail);       
        return `Se envio el mail con el token sastifactoriamente`;
    };
};