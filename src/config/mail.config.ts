import { ConfigService } from '@nestjs/config'
import type { IConfigNodeMailer } from "src/typescript/interfaces/email/email.interfaces"
import type { TName } from 'src/typescript/types/users/user.type'
import type { TToken } from 'src/typescript/types/token/token.types'

export class MailOptions {
    constructor( 
        private readonly configService:ConfigService,
    ) {}

    configTransporter():IConfigNodeMailer {
        return {
            host: this.configService.get<string>('TIME_EXPIRE_OTP'),
            port: this.configService.get<number>('CONFIG_PORT'),
            secure:this.configService.get<boolean>('CONFIG_SECURE'),
            auth: {
                user:this.configService.get<string>('CONFIG_USER'),
                pass:this.configService.get<string>('CONFIG_PASS'),
            },
            tls: {
                rejectUnauthorized:this.configService.get<boolean>('CONFIG_REJECTUNAUTHORIZED'),
            },
        }
    }

    configEmail(name:TName, token:TToken ): string {
        return `
            <div style="font-family: Arial, sans-serif; max-width: 500px; margin: auto; border: 1px solid #eaeaea; padding: 20px; border-radius: 8px;">
                <h2 style="color: #333;">Hola ${name},</h2>
                <p>Tu código de verificación es:</p>
                <p style="font-size: 24px; font-weight: bold; color: #007BFF;">${token}</p>
                <p>Este código es válido por los próximos ${this.configService.get<number>('TIME_EXPIRE_OTP')} minutos.</p>
                <hr />
                <p style="font-size: 12px; color: #999;">Si no solicitaste este código, puedes ignorar este mensaje.</p>
                <p style="font-size: 12px; color: #999;">Gracias,<br>El equipo de ePayco</p>
            </div>
        `
    }
}