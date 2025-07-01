import type { TDocument,TName,TEmail,TPhone,TBalance } from "src/typescript/types/users/user.type"

interface IUser {
    document:TDocument;
    name:TName;
    email:TEmail;
    phone:TPhone;
    balance?:TBalance | null;
}

export type {
    IUser,
}      