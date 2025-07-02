import { Controller, Body, Get, Post } from '@nestjs/common';
import { AuthOtpServices } from './otp.service';
import type { IMailBody } from 'src/typescript/interfaces/body/sendmail.body.types';

@Controller('UserManagementAPI/V1/Auth')
export class OtpAuthController {
    constructor( private readonly otpAuth:AuthOtpServices ) {};

    @Get('/')
    getWelcome() {
        return {
            message:this.otpAuth.welcomeAPI("Bienvenido al Servicio de Solicitud de token OTP de UserManagementAPI"),
        };
    };

    @Post('send-OTP')
    async sendToken( @Body() body:IMailBody ) {
        //console.log('revision de request', body) // llega correcto
        const { documentUser, idTransaction }:IMailBody = body;

        //console.log('revision de la constantes', documentUser, idTransaction ) //llega correcto

        return await this.otpAuth.authOTP(documentUser,idTransaction)
    };
};