import { Injectable, BadRequestException } from '@nestjs/common';
import { UsersRepository } from 'src/modules/users/infrastructure/repositories/users.repositories';
import { TransactionsRepository } from 'src/modules/transactions/infrastructure/repositories/transactions.repository';
import { EmailRepository } from 'src/common/utils/email/infrastructure/repositories/send.email.repository';
import { TokenService } from '../../../token/infrastructure/repositories/token.repository';
import CodeBase64Params from 'src/common/pipes/code/code-base64-string.pipe';

import type { IResponseOtp } from '../../interfaces/types/response-otp.interfaces';

@Injectable()
export class AuthOtpRepository {
    constructor( 
        private readonly usersRepository:UsersRepository,
        private readonly transactionsRepository:TransactionsRepository,
        private readonly otpAUTH:TokenService,
        private readonly mailRepository:EmailRepository,
    ) {};

    welcomeAPI( text:string ): string {
        return text;
    };

    async authOTP( document:string, id:string ): Promise<IResponseOtp | undefined> {
        if ( !document && !id ) throw new BadRequestException('El documento y/o número de transacción son requerido');
        const users = (await this.usersRepository.findUserById(CodeBase64Params(document))).data;
        const transactions = (await this.transactionsRepository.findTransactionById(CodeBase64Params(id))).data;
        const { token, timeExp } = this.otpAUTH.generateToken();

        if ( transactions.document.toString() !== document ) throw new BadRequestException('No Autorizado, Ha ingresado un número de Documento invalido para esta transacción');
        if ( transactions.status !== 'pendiente' ) throw new BadRequestException('No Autorizado, Esta transacción se encuentra Confirmada');
        if ( transactions.type !== 'pago' ) throw new BadRequestException('No Autorizado, Seleccione una transacción de tipo de Pago');
        if ( parseFloat(users.balance ?? '0') <= parseFloat(transactions.amount) ) throw new BadRequestException('No Autorizado, Fondos insuficientes por favor recargue la cuenta');
        
        if ( 
            transactions.document.toString() === document && 
            transactions.status === 'pendiente' && 
            transactions.type === 'pago' && 
            parseFloat(transactions.amount) <= parseFloat(users.balance ?? '0') 
        ) {
            const { tokenConfirmation } = (await this.transactionsRepository.updateTransactionId(
                CodeBase64Params(transactions.id ?? ''), {
                    "tokenConfirmation":CodeBase64Params(token),
                    "sessionExp":CodeBase64Params(timeExp.toString()),
                }
            )).data;

            return {
                data:null,
                message:await this.mailRepository.send(users.email ?? '', users.name ?? '', tokenConfirmation ?? ''),
            };
        };
    };
};