import { IsString, IsNotEmpty, IsNumber } from "class-validator";

export class UsersDTO {
    @IsString()
    @IsNotEmpty()
    document:string;

    @IsString()
    @IsNotEmpty()
    name:string;

    @IsString()
    @IsNotEmpty()
    email:string;

    @IsString()
    @IsNotEmpty()
    phone:string;

    @IsString()
    @IsNotEmpty()
    balance?:string;
};