import { IsString, IsNotEmpty, IsNumber, IsOptional, IsIn } from "class-validator";

export class ConfirmationsDTO {
    @IsString()
    @IsNotEmpty()
    document:string

    @IsString()
    @IsNotEmpty()
    id:string;
};