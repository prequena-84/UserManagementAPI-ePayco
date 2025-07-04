import type { TMessageText } from 'src/typescript/types/response/response.type'

interface IFecth<T> {
    data: T,
    message:TMessageText,
}

export type { 
    IFecth,
}