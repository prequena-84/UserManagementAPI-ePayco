import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UsersRepository } from 'src/modules/users/infrastructure/repositories/users.repositories';
import requestFecth from 'src/common/utils/fetch/fetch.utils';

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
        if ( transactions.type === "recarga" && transactions.amount > 0 ) {
            const users = await requestFecth<IUser> (
                `${String(this.configService.get<string>('URI_USERS'))}/${transactions.userDocument}`, 
                "GET"
            );
            users.data.balance = (users.data.balance ?? 0) + Number(transactions.amount);
        
            await requestFecth<IUser> (
                `${String(this.configService.get<string>('URI_USERS'))}/${transactions.userDocument}`, 
                "PATCH", 
                users.data
            );  
        };

        return requestFecth<ITransaction> (
            String( this.configService.get<string>('URI_TRANSACTIONS') ),
            "POST", 
            transactions,
        );
    };

    async updateTransactionId( id:string, data:ITransaction ): Promise<IResponseTransaction> {
        return requestFecth<ITransaction> (
            `${String(this.configService.get<string>('URI_TRANSACTIONS'))}/${id}`,
            "PATCH", 
            data
        );
    };

    async deleteTransaction( id:string ): Promise<IResponseTransaction> {
        return requestFecth<ITransaction>(`${String(this.configService.get<string>('URI_TRANSACTIONS'))}/${id}`,"DELETE");
    };

    async transactionConfirmation(document:number, id:string): Promise<IResponseConfirmation> {
        const users = await this.userRepository.findUserById(document);
        const transactions = await this.findTransactionById(id);

        if (!users) throw new NotFoundException('Usuario no encontrado');
        if (!transactions) throw new NotFoundException('Transacción no encontrada');

        if ( users.data.document !== transactions.data.userDocument ) throw new BadRequestException('El numero de documento no coincide con el registrado en la transacción, por favor reviselo');
        if ( users.data.balance ?? 0 < transactions.data.amount ) throw new BadRequestException('El saldo que tiene en la cuenta es insuficiente por favor recargue');

        transactions.data.status = 'confirmada';
        users.data.balance = (users.data.balance ?? 0 ) + transactions.data.amount;

        await this.updateTransactionId(transactions.data.id ?? '', transactions.data);
        await this.userRepository.updateUserID(users.data.document, users.data);

        return {
            message:"Transacción confirmada",
        };
    };

    async transactionReport():Promise<IResponseReport> {
        return requestFecth<IReport[]>( String(this.configService.get<string>('URI_REPORT_TRANSACTIONS')) );
    };
};