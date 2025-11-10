import type { ITransaction } from '../transaction/transaction.interfaces'
import type { IUser } from '../../../modules/users/interfaces/types/user.interfaces'
import type { TMessageText } from 'src/typescript/types/response/response.type'

interface IReport extends ITransaction {
    User:IUser;
}

interface IResponseReport {
    data?:IReport | IReport[] | null;
    message?:TMessageText;
}

export type {
    IReport,
    IResponseReport,
}