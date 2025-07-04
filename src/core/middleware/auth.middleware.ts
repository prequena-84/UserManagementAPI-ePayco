import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { TokenService } from 'src/common/token/token.service';
import { ITransaction } from 'src/typescript/interfaces/transaction/transaction.interfaces';
import type { TToken } from 'src/typescript/types/token/token.types';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor( private tokenService:TokenService ) {};
  
  async use(req: Request, _res: Response, next:NextFunction) {  
    const { id }:ITransaction = req.body;
    const authHeader:TToken = req.headers.authorization as string;
    
    if (!authHeader) throw new UnauthorizedException('Token requerido');
    const token:TToken = authHeader.split(' ')[1];
    const response:boolean = await this.tokenService.validateToken(token, id);

    if ( !response ) throw new UnauthorizedException('Token invalido');
    next();
  };
};