import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import type { IConfigNodeMailer } from 'src/config/email/interfaces/types/email.interfaces';

@Injectable()
export class ConfigEmailRepository {
    constructor( private readonly configService:ConfigService ) {};

    configTransporter():IConfigNodeMailer {
        return {
            host:String(this.configService.get<string>('CONFIG_HOST')),
            port:Number(this.configService.get<number>('CONFIG_PORT')),
            secure:this.configService.get<boolean>('CONFIG_SECURE') === true,
            auth: {
                user:String(this.configService.get<string>('CONFIG_USER')),
                pass:String(this.configService.get<string>('CONFIG_PASS')),
            },
            tls: {
                rejectUnauthorized:this.configService.get<boolean>('CONFIG_REJECTUNAUTHORIZED') === true,
            },
        };
    };

    configEmail(name:string, token:string ): string {
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
        `;
    };
};