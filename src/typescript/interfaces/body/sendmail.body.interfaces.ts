import type { TDocumentUser,TIdTransaction } from 'src/typescript/types/body/sendmail.body.types'
import type { TToken } from 'src/typescript/types/token/token.types'

interface IMailBody {
    document:TDocumentUser,
    id:TIdTransaction,
    token?:TToken,
}

export type {
    IMailBody,
}