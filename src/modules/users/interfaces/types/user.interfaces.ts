export interface IUser {
    document:number;
    name:string;
    email:string;
    phone:string;
    balance?:number | null;
}