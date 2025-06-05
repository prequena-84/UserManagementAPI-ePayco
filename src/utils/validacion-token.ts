import path from 'path'
import keyJWT from '../functions/private.key'
import axios from 'axios'

import type { ITransaccion } from 'interfaces/ITransaccion'
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') })

import consultaIdTransaccion from '../functions/consulta-id-transaccion'

//const uriConsultaIdTransaccion:string = process.env.URI_API_CONSULTA_ID_TRANSACCIONES || ''

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

const validateToken = async (token:string, datoDocumento:ITransaccion): Promise<boolean> => {
    try {
        const timeActual = Date.now()

        console.log('revison de validacoin de token', datoDocumento)
        const { token_confirmacion,session_Exp } = await consultaIdTransaccion(datoDocumento)

        if ( token_confirmacion === token && timeActual < session_Exp ) return true
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