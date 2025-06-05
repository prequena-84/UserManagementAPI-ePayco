import path from 'path'
import keyJWT from '../functions/private.key'
import type { IToken } from 'interfaces/IToken'
import type { ITransaccion } from 'interfaces/ITransaccion'
import consultaIdTransaccion from '../functions/transaccion/consulta-id-transaccion'
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') })

const generateToken = ():IToken  => {
    return {
        token:keyJWT(),
        timeExp:Date.now() + Number(process.env.TIME_EXPIRE_OTP) * 60 * 1000,
    }
};

const validateToken = async (token:string, datoDocumento:ITransaccion): Promise<boolean> => {
    try {
        const timeActual = Date.now()
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