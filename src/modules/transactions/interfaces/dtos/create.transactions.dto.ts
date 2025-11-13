import { IsString, IsNotEmpty, IsNumber, IsOptional, IsIn } from "class-validator";

export class TransactionsDTO {
    @IsString()
    @IsNotEmpty()
    id?:string

    @IsString()
    @IsNotEmpty()
    document:string;

    @IsString()
    @IsNotEmpty()
    @IsIn(['recarga', 'pago'])
    type:'recarga' | 'pago';

    @IsString()
    @IsNotEmpty()
    amount:string;

    @IsString()
    @IsNotEmpty()
    @IsIn(['pendiente', 'confirmada'])
    status: 'pendiente' | 'confirmada';

    @IsString()
    @IsOptional()
    tokenConfirmation?:string;

    @IsString()
    @IsOptional()
    sessionExp?:string;
};