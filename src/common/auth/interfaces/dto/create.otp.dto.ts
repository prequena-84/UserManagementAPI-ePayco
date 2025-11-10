import { IsString, IsNotEmpty, IsNumber } from "class-validator";

export class OtpDTO {
    @IsNumber()
    @IsNotEmpty()
    document:number;

    @IsString()
    @IsNotEmpty()
    id:string;

    @IsString()
    @IsNotEmpty()
    token:string;
};