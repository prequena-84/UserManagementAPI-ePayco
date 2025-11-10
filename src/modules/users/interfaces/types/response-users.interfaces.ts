import type { IUser } from "./user.interfaces";

export interface IResponseUser {
    data?: IUser | IUser[] | null | undefined;
    message?: string | null | undefined;
}