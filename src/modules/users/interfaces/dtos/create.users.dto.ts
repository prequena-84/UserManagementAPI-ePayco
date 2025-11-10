import { IsString, IsNotEmpty, IsNumber } from "class-validator";

export class UsersDTO {
    @IsNumber()
    @IsNotEmpty()
    document:number;

    @IsString()
    @IsNotEmpty()
    name:string;

    @IsString()
    @IsNotEmpty()
    email:string;

    @IsString()
    @IsNotEmpty()
    phone:string;

    @IsNumber()
    @IsNotEmpty()
    balance?:number | null;
};