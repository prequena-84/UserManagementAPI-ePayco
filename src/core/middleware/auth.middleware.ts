import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { TokenService } from 'src/common/token/infrastructure/repositories/token.repository';
import decodeStringBase64 from 'src/common/pipes/decode/decode-base64-string.pipe';

import type { ITransaction } from 'src/modules/transactions/interfaces/types/transaction.interfaces';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor( private tokenService:TokenService ) {};
  
  async use(req: Request, _:Response, next:NextFunction) { 
    const { id }:ITransaction = req.body;
    const authHeader = req.headers.authorization;

    if (!authHeader) throw new UnauthorizedException('Token requerido');
    const token = decodeStringBase64(authHeader.split(' ')[1]);
    const response = await this.tokenService.validateToken(token, id ?? '');
    if ( !response ) throw new UnauthorizedException('Token invalido');
    next();
  };
};