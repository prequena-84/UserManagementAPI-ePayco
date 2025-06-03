import path from 'path'
import keyJWT from '../functions/private.key'
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') })

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

/*const validateToken = (token:string): string | null => {
    try {
       
        return ''
    } catch( err ) {

        console.error('error en validateToken', err)
        return null //Token invalido
    }
}*/

export {
    generateToken,
    //validateToken,
}