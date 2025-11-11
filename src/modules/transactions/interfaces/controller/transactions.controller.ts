import { Controller, Get, Param, Patch, Post, Delete, Body, BadRequestException,InternalServerErrorException  } from '@nestjs/common';
import { TransactionsRepository } from '../../infrastructure/repositories/transactions.repository';
import { TransactionsDTO } from '../dtos/create.transactions.dto';
import { ConfirmationsDTO } from '../dtos/confirmation.transactions.dto';

import type { ITransaction } from 'src/modules/transactions/interfaces/types/transaction.interfaces';
import type { IResponseConfirmation } from '../types/response-transactions.confirmation.interfaces';
import type { IResponseTransaction, IResponseTransactions } from 'src/modules/transactions/interfaces/types/response-transaction.interfaces';
import type { IResponseReport } from '../types/response-transactions.report.interfaces';

@Controller('api/v1/service/transactions')
export class TransactionsController {
    constructor( private readonly transactionRepository: TransactionsRepository ) {};

    @Get('welcome')
    getWelcome() {
        return {
            message:this.transactionRepository.welcomeAPI("Bienvenido al Servicio de CRUD de UserManagementAPI Transacciones"),
        };
    };

    @Get('reporting')
    async reportTransaction(): Promise<IResponseReport> {
        try {
            return this.transactionRepository.transactionReport();
        } catch(err) {
            console.error('Error en reportTransaction()', err);
            throw err instanceof BadRequestException ? err : new InternalServerErrorException('Error interno');
        };
    };

    @Post('confirmation')
    async confirmationIdTransaction(@Body() dto:ConfirmationsDTO): Promise<IResponseConfirmation> {
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

    @Get()
    async getTransactions(): Promise<IResponseTransactions> {
        try {
            return this.transactionRepository.findAllTransactions();
        } catch(err) {
            console.error('Error en getTransactions()', err);
            throw err instanceof BadRequestException ? err : new InternalServerErrorException('Error interno');
        };
    };   
    
    @Post()
    async addTransaction( @Body() dto:TransactionsDTO ): Promise<IResponseTransaction> {
        try {
            return this.transactionRepository.createTransaction(dto);
        } catch(err) {
            console.error('Error en addTransaction()', err);
            throw err instanceof BadRequestException ? err : new InternalServerErrorException('Error interno');
        };
    };

    @Get(':id')
    async getIdTransaction( @Param('id') id:string ): Promise<IResponseTransaction> {
        try {
            return this.transactionRepository.findTransactionById(id);
        } catch(err) {
            console.error('Error en getIdTransaction()', err);
            throw err instanceof BadRequestException ? err : new InternalServerErrorException('Error interno');
        };
    };

    @Patch(':id')
    async setIdTransaction(@Param('id') id: string, @Body() body: ITransaction): Promise<IResponseTransaction> {
        try {
            return this.transactionRepository.updateTransactionId(id,body);
        } catch(err) {
            console.error('Error en setIdTransaction()', err);
            throw err instanceof BadRequestException ? err : new InternalServerErrorException('Error interno');
        };
    };

    @Delete(':id')
    async deleteTransaction( @Param('id') id:string ): Promise<IResponseTransaction> {
        try {
            return this.transactionRepository.deleteTransaction(id);
        } catch(err) {
            console.error('Error en deleteTransaction()', err);
            throw err instanceof BadRequestException ? err : new InternalServerErrorException('Error interno');       
        };
    };
};