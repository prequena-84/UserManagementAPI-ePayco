import type { TIdTransaction,TUserDocument,TTransaction,TAmount,TStatus,TTokenConfirmation, TSessionExp } from 'src/typescript/types/transaction/transaction.type'

interface ITransaction {
    id:TIdTransaction;
    userDocument:TUserDocument;
    type:TTransaction;
    amount:TAmount;
    status:TStatus;
    tokenConfirmation?:TTokenConfirmation | null;
    sessionExp?:TSessionExp | null;
}

export type {
    ITransaction,
}