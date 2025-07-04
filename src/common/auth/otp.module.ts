import { Module } from '@nestjs/common';
import { TransactionsModule } from 'src/modules/transactions/transactions.module';
import { UsersModule } from 'src/modules/users/users.module';
import { ConfigModule } from '@nestjs/config';
import { TokenModule } from '../token/token.module';
import { AuthOtpServices } from './otp.service';
import { OtpAuthController } from './otp.controller';
import { EmailModule } from 'src/config/email/email.module';
import { EmailService } from '../utils/email/send.email.service';

@Module({
  imports:[
    UsersModule,
    TransactionsModule,
    ConfigModule,
    TokenModule,
    EmailModule,
  ],
  providers: [
    AuthOtpServices,
    EmailService,
  ],
  controllers: [OtpAuthController],
  exports:[
    AuthOtpServices,
  ],
})
export class OtpAuthModule {};