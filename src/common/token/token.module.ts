import { Module } from '@nestjs/common';
import { UsersModule } from 'src/modules/users/users.module';
import { TransactionsModule } from 'src/modules/transactions/transactions.module';
import { TokenService } from './infrastructure/repositories/token.repository';
import { TokenController } from './interfaces/controller/token.controller';

@Module({
  imports:[
    UsersModule,
    TransactionsModule
  ],
  providers: [
    TokenService,
  ],
  controllers: [TokenController],
  exports:[TokenService],
})
export class TokenModule {};