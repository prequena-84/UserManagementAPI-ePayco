import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UsersService } from '../users/users.service';
import requestFecth from 'src/common/utils/fetch.utils';

import type { ITransaction } from 'src/typescript/interfaces/transaction/transaction.interfaces';
import type { IResponseTransaction } from 'src/typescript/interfaces/response/response-transaction';
import type { TIdTransaction } from 'src/typescript/types/transaction/transaction.type';
import type { TDocument } from 'src/typescript/types/users/user.type';
import type { IUser } from 'src/typescript/interfaces/users/user.interfaces';
import type { IConfirmationResponse } from 'src/typescript/interfaces/response/response-confirmation';
import type { IReport, IResponseReport } from 'src/typescript/interfaces/response/response-report';

@Injectable()
export class TransactionsService {
    constructor( 
        private readonly userService:UsersService,
        private readonly configService: ConfigService, 
    ) {};

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
        if ( data.type === "recarga" && data.amount > 0 ) {
            const dataUser:IUser = await requestFecth<IUser>(`${String(this.configService.get<string>('URI_GET_USERID'))}/${data.userDocument}`, "GET").then( resp => resp.data as IUser );
            dataUser.balance += Number(data.amount);
            await requestFecth<IUser>( `${String(this.configService.get<string>('URI_UPDATE_USER'))}/${data.userDocument}`, "PATCH", dataUser ).catch( err => console.log('error en la actualiazión de los datos del usuario',err) );   
        };

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

    async transactionConfirmation(document:TDocument, id:TIdTransaction):Promise<IConfirmationResponse> {
        const dataUser:IUser = await this.userService.userIdGet(document).then( resp => resp.data as IUser );
        const dataTransaction:ITransaction = await this.transactionIdGet(id).then ( resp => resp.data as ITransaction);

        if ( dataUser.document !== dataTransaction.userDocument ) throw new UnauthorizedException('El numero de documento no coincide con el registrado en la transacción, por favor reviselo');
        if ( dataUser.balance < dataTransaction.amount ) throw new UnauthorizedException('El saldo que tiene en la cuenta es insuficiente por favor recargue');

        dataTransaction.status = 'confirmada';
        dataUser.balance -= dataTransaction.amount;

        await this.transactionIdSet(dataTransaction.id, dataTransaction);
        await this.userService.userIdSet(dataUser.document, dataUser);
        
        return {
            data:null,
            message:'Se ha confirmado la Transacción sastifactoriamente',
        };
    };

    async transactionReport():Promise<IResponseReport> {
        const response = await requestFecth<IReport>( String(this.configService.get<string>('URI_REPORT_TRANSACTION')) );
        return {
            data:response.data,
            message:response.message,
        };
    };
};