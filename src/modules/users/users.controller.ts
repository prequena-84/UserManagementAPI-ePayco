import { Body, Controller, Get, Param, Post, Delete, Patch } from '@nestjs/common';
import { UsersService } from './users.service';
import { IUser } from 'src/typescript/interfaces/users/user.interfaces';
import { TDocument } from 'src/typescript/types/users/user.type';

@Controller('UserManagementAPI/V1/user')
export class UsersController {
    constructor( private usersService:UsersService ) {};

    @Get('/')
    getWelcome() {
        return {
            message:this.usersService.welcomeAPI("Bienvenido al Servicio de CRUD de Usuarios de la API UserManagement Epayco DEMO 2025"),
        };
    };

    @Get('get')
    async getUsers() {
        const response = await this.usersService.usersGet();
        return response;
    };

    @Get('get/:id')
    async getIdUsers( @Param('id') id:TDocument) {
        const response = this.usersService.userIdGet(id);
        return response;
    };

    @Post('add')
    async addUsers( @Body() body:IUser ) {
        const response = await this.usersService.usersAdd(body);
        return response;
    };

    @Patch('set/:id')
    async setIdUsers( @Param('id') id:TDocument, @Body() body:IUser ) {
        const response = await this.usersService.userIdSet(id, body);
        return response;
    };

    @Delete('delete/:id')
    async deleteUsers( @Param('id') id:TDocument ) {
        const response = await  this.usersService.userDelete(id);
        return response;
    };
};
