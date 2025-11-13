import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UsersRepository } from 'src/modules/users/infrastructure/repositories/users.repositories';
import requestFecth from 'src/common/utils/fetch/fetch.utils';
import codeNumberBase64 from 'src/common/pipes/code/code-base64-number.pipe';
import codeStringBase64 from 'src/common/pipes/code/code-base64-string.pipe';
import decodeNumberBase64 from 'src/common/pipes/decode/decode-base64-number.pipe';
import decodeStringBase64 from 'src/common/pipes/decode/decode-base64-string.pipe';

import type { ITransaction } from 'src/modules/transactions/interfaces/types/transaction.interfaces';
import type { IResponseTransaction, IResponseTransactions } from 'src/modules/transactions/interfaces/types/response-transaction.interfaces';
import type { IUser } from 'src/modules/users/interfaces/types/user.interfaces';
import type { IResponseConfirmation } from '../../interfaces/types/response-transactions.confirmation.interfaces';
import type { IReport, IResponseReport } from 'src/modules/transactions/interfaces/types/response-transactions.report.interfaces';

@Injectable()
export class TransactionsRepository {
    constructor( 
        private readonly userRepository:UsersRepository,
        private readonly configService: ConfigService, 
    ) {};

    welcomeAPI( text:string ): string {
        return text;
    };

    async findAllTransactions(): Promise<IResponseTransactions> {
        return requestFecth<ITransaction[]>(String( this.configService.get<string>('URI_TRANSACTIONS') ));
    };

    async findTransactionById( id:string ): Promise<IResponseTransaction> {
        return requestFecth<ITransaction>(`${String(this.configService.get<string>('URI_TRANSACTIONS'))}/${id}`);
    };

    async createTransaction( transactions:ITransaction ): Promise<IResponseTransaction> {
        if ( decodeStringBase64(transactions.type) === "recarga" && decodeNumberBase64(transactions.amount) > 0 ) {
            const users = await requestFecth<IUser> (`${String(this.configService.get<string>('URI_USERS'))}/${transactions.document}`, "GET");
            users.data.balance= codeNumberBase64(parseFloat(users.data.balance?.toString() ?? '0') + decodeNumberBase64(transactions.amount));
               
            await requestFecth<IUser> (
                `${String(this.configService.get<string>('URI_USERS'))}/${transactions.document}`, 
                "PATCH", 
                { "balance": users.data.balance }
            );  
        };

        return requestFecth<ITransaction> (String( this.configService.get<string>('URI_TRANSACTIONS') ), "POST", transactions);
    };

    async updateTransactionId( id:string, data:Partial<ITransaction>): Promise<IResponseTransaction> {
        return requestFecth<ITransaction> (
            `${String(this.configService.get<string>('URI_TRANSACTIONS'))}/${id}`,
            "PATCH", 
            data as unknown as ITransaction
        );
    };

    async deleteTransaction( id:string ): Promise<IResponseTransaction> {
        return requestFecth<ITransaction>(`${String(this.configService.get<string>('URI_TRANSACTIONS'))}/${id}`,"DELETE");
    };

    async transactionConfirmation(document:string, id:string): Promise<IResponseConfirmation> {
        const users = await this.userRepository.findUserById(document);
        const transactions = await this.findTransactionById(id);

        if (!users) throw new NotFoundException('Usuario no encontrado');
        if (!transactions) throw new NotFoundException('Transacción no encontrada');
        if ( users.data.document !== transactions.data.document ) throw new BadRequestException('El numero de documento no coincide con el registrado en la transacción, por favor reviselo');   
        if ( decodeNumberBase64(users.data.balance) < decodeNumberBase64(transactions.data.amount) ) throw new BadRequestException('El saldo que tiene en la cuenta es insuficiente por favor recargue');

        await this.updateTransactionId(codeStringBase64(transactions.data.id ?? ''), {
            "status":codeStringBase64('confirmada'),
        });
        
        await this.userRepository.updateUserID(codeNumberBase64(parseInt(users.data.document)), {
            "balance":codeNumberBase64(parseFloat(users.data.balance ?? '0') - parseFloat(transactions.data.amount)),
        });

        return {
            message:"Transacción confirmada",
        };
    };

    async transactionReport():Promise<IResponseReport> {
        return requestFecth<IReport[]>( String(this.configService.get<string>('URI_REPORT_TRANSACTIONS')) );
    };
};