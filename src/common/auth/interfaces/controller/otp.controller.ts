import { Controller, Body, Get, Post } from '@nestjs/common';
import { AuthOtpRepository } from '../../infrastructure/repositories/otp.repository';
import { DecodeBase64Pipe } from 'src/common/pipes/decode-base64.pipe';
import { OtpDTO } from '../dto/create.otp.dto';

@Controller('UserManagementAPI/V1/Auth')
export class OtpAuthController {
    constructor( private readonly otpAuth:AuthOtpRepository ) {};

    @Get('welcome')
    getWelcome() {
        return {
            message:this.otpAuth.welcomeAPI("Bienvenido al Servicio de Solicitud de token OTP de UserManagementAPI"),
        };
    };

    @Post('send-OTP')
    async sendToken(@Body(new DecodeBase64Pipe()) dto:OtpDTO) {
        return await this.otpAuth.authOTP(dto.document, dto.id);
    };
};