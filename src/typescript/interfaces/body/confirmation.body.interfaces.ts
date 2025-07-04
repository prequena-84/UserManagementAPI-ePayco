import type { TDocument } from 'src/typescript/types/users/user.type'
import type { TIdTransaction } from 'src/typescript/types/transaction/transaction.type'

interface IConfirmation {
    document:TDocument;
    id:TIdTransaction;
};

export type {
    IConfirmation,
}