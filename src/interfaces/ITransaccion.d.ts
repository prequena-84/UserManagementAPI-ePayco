import type { TIdTransaccion } from 'types/TTransaccion'
import { Document, Model } from 'mongoose'

interface ITransaccion {
    id?:TIdTransaccion;
    usuario_doc?:string;
    tipo?:'recarga' | 'pago';
    monto?:number;
    status?:'pendiente' | 'confirmada'
    token_confirmacion?:string;
    session_Exp?:number;
    celular?:string;
}

interface ITrasResp {
    data?:ITransaccion | null | unknown;
    message?:string | null;
}

interface ITransDocument extends Document, ITransaccion{}

interface ITransModel extends Model<ITransDocument> {
    actualizarDatoIdTransaccion(id:TIdTransaccion, datoActualizado:ITransaccion ): Promise<ITrasResp>;
    todasLasTransacciones(): Promise<ITransaccion[]>;
    createInstance(datoTransaccion:ITransaccion): Promise<ITrasResp>;
}

export {
    ITransaccion,
    ITrasResp,
    ITransDocument,
    ITransModel,
}