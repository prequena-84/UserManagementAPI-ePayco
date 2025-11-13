import { IsString, IsNotEmpty, IsNumber } from "class-validator";

export class OtpDTO {
    @IsString()
    @IsNotEmpty()
    document:string;

    @IsString()
    @IsNotEmpty()
    id:string;

    @IsString()
    @IsNotEmpty()
    token:string;
};