import type { ITransaction } from './transaction.interfaces'

interface IResponseTransaction {
    data: ITransaction;
    message?: string;
}

interface IResponseTransactions {
    data: ITransaction[];
    message?: string;
}

export type {
    IResponseTransaction,
    IResponseTransactions,
}