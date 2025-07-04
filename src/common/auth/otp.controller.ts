import { Controller, Body, Get, Post } from '@nestjs/common';
import { AuthOtpServices } from './otp.service';
import type { IMailBody } from 'src/typescript/interfaces/body/sendmail.body.interfaces';

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
        const { document, id }:IMailBody = body;
        return await this.otpAuth.authOTP(document, id);
    };
};