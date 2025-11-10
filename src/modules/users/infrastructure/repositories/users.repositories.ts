import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import requestFecth from 'src/common/utils/fetch.utils';
import type { IUser } from 'src/modules/users/interfaces/types/user.interfaces';
import type { IResponseUser,IResponseUsers } from 'src/modules/users/interfaces/types/response-users.interfaces';

@Injectable()
export class UsersRepository {
    constructor( private configService: ConfigService ) {};

    welcomeAPI( text:string ): string {
        return text;
    };

   async findAllUsers(): Promise<IResponseUsers> {
        return requestFecth<IUser[]>( String(this.configService.get<string>('URI_USERS')) );
    };

    async findUserById( document:number ): Promise<IResponseUser> {
        return requestFecth<IUser>(`${String(this.configService.get<string>('URI_USERS'))}/${document}`);
    };
    
    async createUser( data:IUser ):Promise<IResponseUser> {
        return requestFecth<IUser>( String(this.configService.get<string>('URI_USERS')), "POST", data );
    };

    async updateUserID( id:number, data:IUser ): Promise<IResponseUser> {
        return requestFecth<IUser>(`${String( this.configService.get<string>('URI_USERS') )}/${id}`, "PATCH", data);
    };

    async deleteUser( id:number ): Promise<IResponseUser> {
        return requestFecth<IUser>( `${String( this.configService.get<string>('URI_USERS') )}/${id}`, "DELETE" );
    };
};