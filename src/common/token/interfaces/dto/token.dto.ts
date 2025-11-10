import { IsString, IsNotEmpty, IsNumber, IsOptional, IsIn } from "class-validator";

export class TokenDTO {
    @IsString()
    @IsNotEmpty()
    token:string

    @IsNumber()
    @IsNotEmpty()
    timeExp:string;
};