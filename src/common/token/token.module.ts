import { Module } from '@nestjs/common';
import { UsersModule } from 'src/modules/users/users.module';
import { TransactionsModule } from 'src/modules/transactions/transactions.module';
import { TokenService } from './token.service';
import { TokenController } from './token.controller';

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