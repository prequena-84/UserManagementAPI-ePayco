import type { TIdUsuario,TUsuario } from 'types/Tusuario'
import { Document, Model } from 'mongoose'

interface IUsuario {
    documento:TUsuario;
    nombre:string;
    email:string;
    celular:string;
    saldo:number;
}

interface IUsuarioResp {
    data?:IUsuario | null ;
    message?:string | null;
}

interface IUsuarioDocument extends Document, IUsuario{}

interface IUsuarioModel extends Model<IUsuarioDocument> {
    actualizarDatoIdUsuario(documento:TIdUsuario, datoActualizado:IUsuario ): Promise<IUsuarioResp>;
    todosLosUsuario(): Promise<IUsuario[]>;
    createInstance(datoUsuario:IUsuario): Promise<IUsuarioResp>;
}

export {
    IUsuario,
    IUsuarioResp,
    IUsuarioDocument,
    IUsuarioModel,
}