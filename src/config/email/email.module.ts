import { Module } from '@nestjs/common';
import { ConfigEmailRepository } from './infrastructure/repositories/email.repository';
import { EmailController } from './interfaces/controller/email.controller';

@Module({
  providers: [ConfigEmailRepository],
  controllers: [EmailController],
  exports:[ConfigEmailRepository],
})
export class EmailModule {};