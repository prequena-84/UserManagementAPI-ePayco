import { Module } from '@nestjs/common';
import { ConfigEmailRepository } from 'src/config/email/infrastructure/repositories/email.repository';
import { EmailRepository } from './infrastructure/repositories/send.email.repository';
import { EmailController } from './interfaces/controller/send.email.controller';

@Module({
  providers: [
    EmailRepository,
    ConfigEmailRepository,
  ],
  controllers: [EmailController],
  exports:[
    EmailRepository,
    ConfigEmailRepository,
  ],
})
export class SendModule {};