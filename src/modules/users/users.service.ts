import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import requestFecth from 'src/common/utils/fetch.utils';
import type { IUser } from 'src/typescript/interfaces/users/user.interfaces';
import type { IResponseUser } from 'src/typescript/interfaces/response/response-user.interfaces';
import type { TDocument } from 'src/typescript/types/users/user.type';

@Injectable()
export class UsersService {
    constructor( private configService: ConfigService ) {};

    welcomeAPI( text:string ): string {
        return text;
    };

   async usersGet():Promise<IResponseUser> {
        const response = await requestFecth<IUser | IUser[]>( String(this.configService.get<string>('URI_GET_USERS')) );
        return {
            data:response.data,
            message:response.message,
        };
    };

    async userIdGet( id:TDocument ): Promise<IResponseUser> {
        const response = await requestFecth<IUser>( `${String(this.configService.get<string>('URI_GET_USERID'))}/${id}` );
        return {
            data:response.data,
            message:response.message,
        };
    };
    
    async usersAdd( data:IUser ):Promise<IResponseUser> {
        const response = await requestFecth<IUser>( String(this.configService.get<string>('URI_ADD_USER')), "POST", data );
        return {
            data:response.data,
            message:response.message,
        };
    };

    async userIdSet( id:TDocument, data:IUser ): Promise<IResponseUser> {
        const response = await requestFecth<IUser>( `${String( this.configService.get<string>('URI_UPDATE_USER') )}/${id}`, "PATCH", data );
        return {
            data:response.data,
            message:response.message,
        };
    };

    async userDelete( id:TDocument ): Promise<IResponseUser> {
        const response = await requestFecth<IUser>( `${String( this.configService.get<string>('URI_DELETE_USER') )}/${id}`, "DELETE" );
        return {
            data:response.data,
            message:response.message,
        };
    };
};