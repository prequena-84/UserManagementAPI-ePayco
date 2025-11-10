import type { IUser } from './user.interfaces'

interface IResponseUser {
    data: IUser;
    message?: string;
}

interface IResponseUsers {
    data: IUser[];
    message?: string;
}

export type {
    IResponseUser,
    IResponseUsers,
}