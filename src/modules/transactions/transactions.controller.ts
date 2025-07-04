import { Controller, Get, Param, Patch, Post, Delete, Body  } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import type { ITransaction } from 'src/typescript/interfaces/transaction/transaction.interfaces';
import type { TIdTransaction } from 'src/typescript/types/transaction/transaction.type';
import type { IConfirmation } from 'src/typescript/interfaces/body/confirmation.body.interfaces';

@Controller('UserManagementAPI/V1/transactions')
export class TransactionsController {
    constructor( private readonly transactionService: TransactionsService ) {};

    @Get('/')
    getWelcome() {
        return {
            message:this.transactionService.welcomeAPI("Bienvenido al Servicio de CRUD de UserManagementAPI Transacciones"),
        };
    };

    @Get('get')
    async getTransactions() {
        return await this.transactionService.transactionGet();
    };

    @Get('get/:id')
    async getIdTransaction( @Param('id') id:TIdTransaction ) {
        return await this.transactionService.transactionIdGet(id);
    };

    @Post('add')
    async addTransaction( @Body() body:ITransaction ) {
        return await this.transactionService.transactionAdd(body);
    };

    @Post('confirmation')
    async confirmationIdTransaction( @Body() body:IConfirmation ) {
        const { document, id } = body;
        return this.transactionService.transactionConfirmation(document,id);
    };

    @Patch(':id')
    async setIdTransaction( @Param('id') id:TIdTransaction, @Body() body:ITransaction ) {
        return await this.transactionService.transactionIdSet(id,body);
    };

    @Delete(':id')
    async deleteTransaction( @Param('id') id:TIdTransaction ) {
        return await this.transactionService.transactionDelete(id);
    };
};