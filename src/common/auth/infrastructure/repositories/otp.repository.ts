import { Injectable, BadRequestException } from '@nestjs/common';
import { UsersRepository } from 'src/modules/users/infrastructure/repositories/users.repositories';
import { TransactionsRepository } from 'src/modules/transactions/infrastructure/repositories/transactions.repository';
import { EmailService } from '../../../utils/email/infrastructure/repositories/send.email.repository';
import { TokenService } from '../../../token/infrastructure/repositories/token.repository';

import type { IResponseOtp } from '../../interfaces/types/response-otp.interfaces';

@Injectable()
export class AuthOtpRepository {
    constructor( 
        private readonly usersRepository:UsersRepository,
        private readonly transactionsRepository:TransactionsRepository,
        private readonly otpAUTH:TokenService,
        private readonly mailService:EmailService,
    ) {};

    welcomeAPI( text:string ): string {
        return text;
    };

    async authOTP( document:number, id:string ): Promise<IResponseOtp> {
        if ( !document && !id ) throw new BadRequestException('El documento y/o número de transacción son requerido');
        
        const users = (await this.usersRepository.findUserById(document)).data;
        const transactions = (await this.transactionsRepository.findTransactionById(id)).data;
        const { token, timeExp } = this.otpAUTH.generateToken();

        if ( transactions.userDocument !== document ) throw new BadRequestException('No Autorizado, Ha ingresado un número de Documento invalido para esta transacción');
        if ( transactions.status !== 'pendiente' ) throw new BadRequestException('No Autorizado, Esta transacción se encuentra Confirmada');
        if ( transactions.type !== 'pago' ) throw new BadRequestException('No Autorizado, Seleccione una transacción de tipo de Pago');
        if ( users.balance ?? 0 <= transactions.amount ) throw new BadRequestException('No Autorizado, Fondos insuficientes por favor recargue la cuenta');

        if ( transactions.userDocument === document && transactions.status === 'pendiente' && transactions.type === 'pago' && transactions.amount <= Number(users.balance) ) {
            
            transactions.tokenConfirmation = token; transactions.sessionExp = timeExp;
            const { tokenConfirmation }  = (await this.transactionsRepository.updateTransactionId(transactions.id, transactions)).data;

            return {
                data:null,
                message:await this.mailService.send(users.email, users.name, tokenConfirmation),
            };
        };

        return {
            data:null,
            message:'No se envio el Email',
        };
    };
};