import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TransactionsService } from "src/modules/transactions/transactions.service"
import generateKeyOTP from '../utils/generate.key.otp';
import type { TIdTransaction } from "src/typescript/types/transaction/transaction.type"
import type { IToken } from "src/typescript/interfaces/token/token.interfaces"
import type { ITransaction } from "src/typescript/interfaces/transaction/transaction.interfaces"
import type { TToken } from "src/typescript/types/token/token.types"

@Injectable()
export class TokenService {
    constructor(
        private readonly configService: ConfigService,
        private readonly transactionsService: TransactionsService,
    ) {};

    generateToken():IToken {          
        return {
            token:generateKeyOTP(),
            timeExp:Date.now() + Number(this.configService.get<number>('TIME_EXPIRE_OTP')) * 60 * 1000,
        };
    };

    async validateToken( token:TToken, idTransaction:TIdTransaction ): Promise<boolean> {
        const timeCurrent = Date.now(), { tokenConfirmation, sessionExp }:ITransaction = await this.transactionsService.transactionIdGet(idTransaction) as ITransaction;

        if ( !tokenConfirmation || !sessionExp ) return false;
        if ( tokenConfirmation === token && timeCurrent < sessionExp ) return true;
        return false;
    };
};