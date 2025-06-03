import path from 'path'
import keyJWT from '../functions/private.key'
import axios from 'axios'
import type { IToken } from 'interfaces/IToken'
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') })
const uriConsultaIdTransaccion:string = process.env.URI_API_CONSULTA_ID_TRANSACCIONES || ''

interface ResponseToken {
    token:string;
    timeExp:number;
}

const generateToken = (): ResponseToken => {
    return {
        token:keyJWT(),
        timeExp:Date.now() + Number(process.env.TIME_EXPIRE_OTP) * 60 * 1000,
    }
};

// Ingresar la consulta a la base de datos
const validateToken = async (token:string,datoDocumento:IToken): Promise<boolean> => {
    try {
        const timeActual = Date.now()
        const datosTransaccion = await axios.post(uriConsultaIdTransaccion, {datoDocumento})

        if ( datosTransaccion.data.data.token_confirmacion === token && timeActual < datosTransaccion.data.data.session_Exp ) return true
        return false
    } catch( err ) {
        
        console.error('error en validateToken', err)
        return false 
    }
}

export {
    generateToken,
    validateToken,
}