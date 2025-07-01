import type { ITransaction } from "../transaction/transaction.interfaces";
import type { TMessageText } from "src/typescript/types/response/response.type";

interface IResponseTransaction {
    data?: ITransaction | ITransaction[] | null | undefined;
    message?: TMessageText | null | undefined;
}

export type {
    IResponseTransaction,
}