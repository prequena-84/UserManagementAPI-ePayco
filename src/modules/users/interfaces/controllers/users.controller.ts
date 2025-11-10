import { Body, Controller, Get, Param, Post, Delete, Patch, InternalServerErrorException, BadRequestException } from '@nestjs/common';
import { UsersRepository } from '../../infrastructure/repositories/users.repositories';
import { DecodeBase64Params } from 'src/common/pipes/decode-base64.params.pipe';
import { DecodeBase64Pipe } from 'src/common/pipes/decode-base64.pipe';
import { UsersDTO } from '../dtos/create.users.dto';

import type { IResponseUser } from 'src/typescript/interfaces/response/response-user.interfaces';

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
    async getUsers(): Promise<IResponseUser> {
        try {
            const { data, message } = await this.usersRepository.findAllUsers();
            return {
                data,
                message,
            };
        } catch(err) {
            console.error('Error en getUsers()', err);
            throw err instanceof BadRequestException ? err : new InternalServerErrorException('Error interno');
        };
    };

    @Get(':document')
    async getIdUsers( @Param('document', DecodeBase64Params) document:number): Promise<IResponseUser> {
        try {
            const { data, message } = await this.usersRepository.findUserById(document);
            return {
                data,
                message,
            };
        } catch(err)  {
            console.error('Error en getIdUsers()', err);
            throw err instanceof BadRequestException ? err : new InternalServerErrorException('Error interno');
        };
    };

    @Post()
    async addUsers( @Body( new DecodeBase64Pipe() ) dto:UsersDTO ): Promise<IResponseUser> {
        try {
            const { data, message } = await this.usersRepository.createUser(dto);
            return {
                data,
                message,
            };
        } catch(err) {
            console.error('Error en addUsers()', err);
            throw err instanceof BadRequestException ? err : new InternalServerErrorException('Error interno');
        };
    };

    @Patch(':id')
    async setIdUsers(
        @Param('id', DecodeBase64Params) id:number, 
        @Body(new DecodeBase64Pipe()) dto:UsersDTO, 
    ): Promise<IResponseUser> {
        try {
            const { data, message } = await this.usersRepository.updateUserID(id, dto);
            return {
                data,
                message,
            };
        } catch(err) {
            console.error('Error en setIdUsers()', err);
            throw err instanceof BadRequestException ? err : new InternalServerErrorException('Error interno');
        };
    };

    @Delete(':id')
    async deleteUsers( @Param('id', DecodeBase64Params) id:number ): Promise<IResponseUser> {
        try {
            const { data, message } = await  this.usersRepository.deleteUser(id);
            return {
                data,
                message,
            };
        } catch(err) {
            console.error('Error en deleteUsers()', err);
            throw err instanceof BadRequestException ? err : new InternalServerErrorException('Error interno');
        };
    };
};