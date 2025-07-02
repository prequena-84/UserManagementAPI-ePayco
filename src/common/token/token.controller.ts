import { Controller, Body, Post  } from '@nestjs/common';
import { TokenService } from './token.service';
import type { TToken } from 'src/typescript/types/token/token.types';
import type { TIdTransaction } from 'src/typescript/types/transaction/transaction.type';

@Controller('UserManagementAPI/V1/token')
export class TokenController {
    constructor( private readonly tokenServices:TokenService ) {}

    async validateToken( token:TToken, idTransaction:TIdTransaction ): Promise<boolean> {
        return await this.tokenServices.validateToken( token,idTransaction );
    };
};