import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/modules/users/users.service';
import { TransactionsService } from 'src/modules/transactions/transactions.service';
import { EmailService } from '../utils/email/send.email.service';
import { TokenService } from '../token/token.service';

import type { IUser } from 'src/typescript/interfaces/users/user.interfaces';
import type { ITransaction } from 'src/typescript/interfaces/transaction/transaction.interfaces';
import type { IToken } from 'src/typescript/interfaces/token/token.interfaces';
import type { TDocument } from 'src/typescript/types/users/user.type';
import type { TIdTransaction } from 'src/typescript/types/transaction/transaction.type';


@Injectable()
export class AuthOtpServices {
    constructor( 
        private readonly usersService:UsersService,
        private readonly transactionService:TransactionsService,
        private readonly otpAUTH:TokenService,
        private readonly mailService:EmailService,
    ) {};

    welcomeAPI( text:string ): string {
        return text;
    };

    async authOTP( document:TDocument, id:TIdTransaction ) {
        if ( !document && !id ) throw new UnauthorizedException('El documento y/o número de transacción son requerido');
        
        const { name, email, balance }:IUser = await this.usersService.userIdGet(document).then(res => res.data as IUser);
        const dataTransaction: ITransaction = await this.transactionService.transactionIdGet(id).then(resp => resp.data as ITransaction);

        const { id: idTransaction, userDocument, status, type, amount } = dataTransaction;
        const { token, timeExp }:IToken = this.otpAUTH.generateToken();

        if ( userDocument !== document ) throw new UnauthorizedException('No Autorizado, Ha ingresado un número de Documento invalido para esta transacción');
        if ( status !== 'pendiente' ) throw new UnauthorizedException('No Autorizado, Esta transacción se encuentra Confirmada');
        if ( type !== 'pago' ) throw new UnauthorizedException('No Autorizado, Seleccione una transacción de tipo de Pago');
        if ( (balance as number) <= amount ) throw new UnauthorizedException('No Autorizado, Fondos insuficientes por favor recargue la cuenta');

        if ( userDocument === document && status === 'pendiente' && type === 'pago' && amount <= Number(balance) ) {

            dataTransaction.tokenConfirmation = token;
            dataTransaction.sessionExp = timeExp;
            const { tokenConfirmation }:ITransaction = await this.transactionService.transactionIdSet(idTransaction, dataTransaction).then(resp => resp.data as ITransaction);

            return {
                data:null,
                message:await this.mailService.send(email,name,tokenConfirmation as string),
            };
        };
    };
};