import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TransactionsRepository } from 'src/modules/transactions/infrastructure/repositories/transactions.repository';
import generateKeyOTP from '../../../utils/generate.key.otp';

import type { IToken } from 'src/common/token/interfaces/types/token.interfaces';

@Injectable()
export class TokenService {
    constructor(
        private readonly configService: ConfigService,
        private readonly transactionsRepository: TransactionsRepository,
    ) {};

    generateToken():IToken {          
        return {
            token:generateKeyOTP(),
            timeExp:Date.now() + Number(this.configService.get<number>('TIME_EXPIRE_OTP')) * 60 * 1000,
        };
    };

    async validateToken( token:string, id:string ): Promise<boolean> {
        const timeCurrent = Date.now();
        const { data } = await this.transactionsRepository.findTransactionById(id);

        if ( !data.tokenConfirmation || !data.sessionExp ) return false;
        if ( data.tokenConfirmation === token && timeCurrent < data.sessionExp ) return true;
        return false;
    };
};