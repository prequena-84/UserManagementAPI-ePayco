import { Module } from '@nestjs/common';
import { TransactionsModule } from 'src/modules/transactions/transactions.module';
import { UsersModule } from 'src/modules/users/users.module';
import { ConfigModule } from '@nestjs/config';
import { TokenModule } from '../token/token.module';
import { AuthOtpServices } from './infrastructure/repositories/otp.repository';
import { OtpAuthController } from './interfaces/controller/otp.controller';
import { EmailModule } from 'src/config/email/email.module';
import { EmailService } from '../utils/email/infrastructure/repositories/send.email.repository';

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