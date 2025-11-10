import type { IUser } from '../../../modules/users/interfaces/types/user.interfaces'
import type { TMessageText } from 'src/typescript/types/response/response.type'

export interface IResponseUser {
    data: IUser | IUser[];
    message?: string;
}