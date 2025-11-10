import { IsString, IsNotEmpty, IsNumber, IsOptional, IsIn } from "class-validator";

export class ConfirmationsDTO {
    @IsNumber()
    @IsNotEmpty()
    document:number

    @IsString()
    @IsNotEmpty()
    id:string;
};