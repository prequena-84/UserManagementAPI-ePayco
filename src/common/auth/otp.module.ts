import { Module } from '@nestjs/common';
import { TransactionsModule } from 'src/modules/transactions/transactions.module';
import { UsersModule } from 'src/modules/users/users.module';
import { MailServices } from '../utils/send.mail.services';
import { ConfigModule } from '@nestjs/config';
import { TokenModule } from '../token/token.module';
import { AuthOtpServices } from './otp.service';
import { OtpAuthController } from './otp.controller';

@Module({
  imports:[
    UsersModule,
    TransactionsModule,
    ConfigModule,
    TokenModule,
  ],
  providers: [
    AuthOtpServices,
    //TokenService,
    MailServices,
  ],
  controllers: [OtpAuthController],
  exports:[
    AuthOtpServices,
    //TokenService,
  ],
})
export class OtpAuthModule {};