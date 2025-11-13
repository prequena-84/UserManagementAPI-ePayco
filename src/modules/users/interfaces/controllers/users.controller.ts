import { Body, Controller, Get, Param, Post, Delete, Patch, InternalServerErrorException, BadRequestException } from '@nestjs/common';
import { UsersRepository } from '../../infrastructure/repositories/users.repositories';
import { UsersDTO } from '../dtos/create.users.dto';

import type { IResponseUser, IResponseUsers } from 'src/modules/users/interfaces/types/response-users.interfaces';

@Controller('api/v1/service/users')
export class UsersController {
    constructor( private usersRepository:UsersRepository ) {};

    @Get('welcome')
    getWelcome() {
        return {
            message:this.usersRepository.welcomeAPI("Bienvenido al Servicio de Clientes"),
        };
    };

    @Get()
    async getUsers(): Promise<IResponseUsers> {
        try {
            return this.usersRepository.findAllUsers();
        } catch(err) {
            console.error('Error en getIdUsers()', err);
            throw err instanceof BadRequestException ? err : new InternalServerErrorException('Error interno');  
        };
    };

    @Post()
    async addUsers( @Body() dto:UsersDTO ): Promise<IResponseUser> {
        try {
            return this.usersRepository.createUser(dto);
        } catch(err) {
            console.error('Error en addUsers()', err);
            throw err instanceof BadRequestException ? err : new InternalServerErrorException('Error interno');
        };
    };

    @Get(':id')
    async getIdUsers( @Param('id') id:string): Promise<IResponseUser> {
        try {
            return this.usersRepository.findUserById(id);
        } catch(err)  {
            console.error('Error en getIdUsers()', err);
            throw err instanceof BadRequestException ? err : new InternalServerErrorException('Error interno');
        };
    };

    @Patch(':id')
    async setIdUsers(@Param('id') id:string, @Body() dto:UsersDTO ): Promise<IResponseUser> {
        try {
            return this.usersRepository.updateUserID(id, dto);
        } catch(err) {
            console.error('Error en setIdUsers()', err);
            throw err instanceof BadRequestException ? err : new InternalServerErrorException('Error interno');
        };
    };

    @Delete(':id')
    async deleteUsers( @Param('id') id:number ): Promise<IResponseUser> {
        try {
            return this.usersRepository.deleteUser(id);
        } catch(err) {
            console.error('Error en deleteUsers()', err);
            throw err instanceof BadRequestException ? err : new InternalServerErrorException('Error interno');
        };
    };
};