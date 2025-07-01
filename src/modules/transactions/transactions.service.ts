import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import requestFecth from 'src/common/utils/fetch.utils';

import type { ITransaction } from 'src/typescript/interfaces/transaction/transaction.interfaces';
import type { IResponseTransaction } from 'src/typescript/interfaces/response/response-transaction';
import type { TIdTransaction } from 'src/typescript/types/transaction/transaction.type';

@Injectable()
export class TransactionsService {
    constructor( private configService: ConfigService ) {};

    welcomeAPI( text:string ): string {
        return text;
    };

    async transactionGet(): Promise<IResponseTransaction> {
        const response = await requestFecth<ITransaction | ITransaction[]>(String( this.configService.get<string>('URI_GET_TRANSACTION') ));
        return {
            data:response.data,
            message:response.message,
        };
    };

    async transactionIdGet( id:TIdTransaction ): Promise<IResponseTransaction> {
        const response = await requestFecth<ITransaction | ITransaction[]>(`${String(this.configService.get<string>('URI_GET_TRANSACTIONID'))}/${id}`);
        return {
            data:response.data,
            message:response.message,
        };
    };

    async transactionAdd( data:ITransaction ):Promise<IResponseTransaction> {
        const response = await requestFecth<ITransaction | ITransaction[]>(String( this.configService.get<string>('URI_ADD_TRANSACTION') ),"POST", data);
        return {
            data:response.data,
            message:response.message,
        };
    };

    async transactionIdSet( id:TIdTransaction, data:ITransaction ): Promise<IResponseTransaction> {
        const response = await requestFecth<ITransaction | ITransaction[]>(`${String(this.configService.get<string>('URI_SET_TRANSACTIONID'))}/${id}`,"PATCH", data);
        return {
            data:response.data,
            message:response.message,
        };
    };

    async transactionDelete( id:TIdTransaction ): Promise<IResponseTransaction> {
        const response = await requestFecth<ITransaction | ITransaction[]>(`${String(this.configService.get<string>('URI_SET_TRANSACTIONID'))}/${id}`,"DELETE");
        return {
            data:response.data,
            message:response.message,
        };
    };
};