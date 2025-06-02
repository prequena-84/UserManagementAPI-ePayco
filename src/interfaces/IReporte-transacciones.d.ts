import type { TIdTransaccion,TTransaccion } from 'types/TTransaccion'
import type { TIdUsuario,TUsuario } from 'types/Tusuario'
import { Document, Model } from 'mongoose'

interface IReporte {
    id?:TIdTransaccion;
    usuario_doc?:TTransaccion;
    tipo?:'recarga' | 'pago';
    monto?:number;
    status?:'pendiente' | 'confirmada'
    token_confirmacion?: string | null;
    session_id?: string | null;
    id?:TIdusuario;
    documento?:Tusuario;
    nombre?:string;
    email?:string;
    celular?:string
    saldo?:string;
}

interface IReporteResp {
    data?:IReporte | IReporte[] | null;
    message?:string | null;
}

export type {
    IReporte,
    IReporteResp,
}