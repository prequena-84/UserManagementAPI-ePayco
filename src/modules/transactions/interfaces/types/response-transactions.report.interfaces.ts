import type { ITransaction } from './transaction.interfaces'
import type { IUser } from '../../../users/interfaces/types/user.interfaces'

interface IReport extends ITransaction {
    User:IUser;
}

interface IResponseReport {
    data?:IReport[] | null;
    message?:string;
}

export type {
    IReport,
    IResponseReport,
}