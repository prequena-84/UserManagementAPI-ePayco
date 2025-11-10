import { Controller, Get, Param, Patch, Post, Delete, Body, BadRequestException,InternalServerErrorException  } from '@nestjs/common';
import { DecodeBase64Params } from 'src/common/pipes/decode-base64.params.pipe';
import { DecodeBase64Pipe } from 'src/common/pipes/decode-base64.pipe';
import { TransactionsRepository } from '../../infrastructure/repositories/transactions.repository';
import { TransactionsDTO } from '../dtos/create.transactions.dto';
import { ConfirmationsDTO } from '../dtos/confirmation.transactions.dto';

import type { ITransaction } from 'src/modules/transactions/interfaces/types/transaction.interfaces';
import type { IResponseConfirmation } from '../types/response-transactions.confirmation.interfaces';
import type { IResponseTransaction, IResponseTransactions } from 'src/modules/transactions/interfaces/types/response-transaction.interfaces';
import type { IResponseReport } from '../types/response-transactions.report.interfaces';

@Controller('api/v1/service/users/transactions')
export class TransactionsController {
    constructor( private readonly transactionRepository: TransactionsRepository ) {};

    @Get('welcome')
    getWelcome() {
        return {
            message:this.transactionRepository.welcomeAPI("Bienvenido al Servicio de CRUD de UserManagementAPI Transacciones"),
        };
    };

    @Get()
    async getTransactions(): Promise<IResponseTransactions> {
        try {
            const { data, message } = await this.transactionRepository.findAllTransactions();
            return {
                data,
                message,
            };
        } catch(err) {
            console.error('Error en getTransactions()', err);
            throw err instanceof BadRequestException ? err : new InternalServerErrorException('Error interno');
        };
    };

    @Get(':id')
    async getIdTransaction( @Param('id', DecodeBase64Params) id:string ): Promise<IResponseTransaction> {
        try {
            const { data, message } = await this.transactionRepository.findTransactionById(id);
            return {
                data,
                message,
            };
        } catch(err) {
            console.error('Error en getIdTransaction()', err);
            throw err instanceof BadRequestException ? err : new InternalServerErrorException('Error interno');
        };
    };

    @Post()
    async addTransaction( @Body( new DecodeBase64Pipe() ) dto:TransactionsDTO ): Promise<IResponseTransaction> {
        try {
            const { data, message } = await this.transactionRepository.createTransaction(dto);
            return {
                data,
                message,
            };
        } catch(err) {
            console.error('Error en addTransaction()', err);
            throw err instanceof BadRequestException ? err : new InternalServerErrorException('Error interno');
        };
    };

    @Post('confirmation')
    async confirmationIdTransaction( 
        @Body(new DecodeBase64Pipe()) dto:ConfirmationsDTO 
    ): Promise<IResponseConfirmation> {
        try {
            const { message } = await this.transactionRepository.transactionConfirmation(dto.document, dto.id);
            return {
                data: null,
                message,
            };
        } catch(err) {
            console.error('Error en confirmationIdTransaction()', err);
            throw err instanceof BadRequestException ? err : new InternalServerErrorException('Error interno');   
        };
    };

    @Patch(':id')
    async setIdTransaction(
        @Param('id',DecodeBase64Params) id: string, 
        @Body(new DecodeBase64Pipe()) 
        body: ITransaction,
    ): Promise<IResponseTransaction> {
        try {
            const { data, message } = await this.transactionRepository.updateTransactionId(id,body);
            return {
                data,
                message,
            };
        } catch(err) {
            console.error('Error en setIdTransaction()', err);
            throw err instanceof BadRequestException ? err : new InternalServerErrorException('Error interno');
        };
    };

    @Delete(':id')
    async deleteTransaction( @Param('id',DecodeBase64Params) id:string ): Promise<IResponseTransaction> {
        try {

            const { data, message } = await this.transactionRepository.deleteTransaction(id);
            return {
                data,
                message,
            };
        } catch(err) {
            console.error('Error en deleteTransaction()', err);
            throw err instanceof BadRequestException ? err : new InternalServerErrorException('Error interno');       
        };
    };

    @Get('report')
    async reportTransaction(): Promise<IResponseReport> {
        try {
            const { data, message } = await this.transactionRepository.transactionReport();
            return {
                data,
                message,
            }
        } catch(err) {
            console.error('Error en reportTransaction()', err);
            throw err instanceof BadRequestException ? err : new InternalServerErrorException('Error interno');
        };
    };
};