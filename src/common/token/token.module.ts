import { Module } from '@nestjs/common';
import { TransactionsService } from 'src/modules/transactions/transactions.service';
import { TokenService } from './token.service';
import { TokenController } from './token.controller';

@Module({
  providers: [
    TokenService,
    TransactionsService,
  ],
  controllers: [TokenController],
  exports:[TokenService],
})
export class TokenModule {}
