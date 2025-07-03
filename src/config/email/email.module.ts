import { Module } from '@nestjs/common';
import { ConfigEmailService } from './email.service';
import { EmailController } from './email.controller';

@Module({
  providers: [ConfigEmailService],
  controllers: [EmailController],
  exports:[ConfigEmailService],
})
export class EmailModule {};