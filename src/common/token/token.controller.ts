import { Controller, Body, Post, Param  } from '@nestjs/common';
import { TokenService } from './token.service';
import type { IToken } from 'src/typescript/interfaces/token/token.interfaces';
import type { TIdTransaction } from 'src/typescript/types/transaction/transaction.type';

@Controller('UserManagementAPI/V1/token')
export class TokenController {
    constructor( private readonly tokenServices:TokenService ) {}

    @Post('validate/:id')
    async validate( @Param('id') id:TIdTransaction, @Body() body:IToken ): Promise<boolean> {
        const { token }:IToken = body;
        return await this.tokenServices.validateToken( token, id );
    };
};