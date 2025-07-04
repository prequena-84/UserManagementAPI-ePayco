import { Module } from '@nestjs/common';
import { UsersModule } from '../users/users.module';
import { TransactionsController } from './transactions.controller';
import { TransactionsService } from './transactions.service';

@Module({
  imports:[
    UsersModule,
  ],
  providers: [TransactionsService],
  controllers: [TransactionsController],
  exports:[TransactionsService],
})
export class TransactionsModule {};