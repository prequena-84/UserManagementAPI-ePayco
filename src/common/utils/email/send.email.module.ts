import { Module } from '@nestjs/common';
import { ConfigEmailService } from 'src/config/email/email.service';
import { EmailService } from './send.email.service';
import { EmailController } from './send.email.controller';

@Module({
  providers: [
    EmailService,
    ConfigEmailService,
  ],
  controllers: [EmailController],
  exports:[
    EmailService,
    ConfigEmailService,
  ],
})
export class SendModule {};