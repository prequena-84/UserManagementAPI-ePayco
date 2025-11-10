import { Module } from '@nestjs/common';
import { UsersModule } from '../users/users.module';
import { TransactionsController } from './interfaces/controller/transactions.controller';
import { TransactionsRepository } from './infrastructure/repositories/transactions.repository';

@Module({
  imports:[
    UsersModule,
  ],
  providers: [TransactionsRepository],
  controllers: [TransactionsController],
  exports:[TransactionsRepository],
})
export class TransactionsModule {};