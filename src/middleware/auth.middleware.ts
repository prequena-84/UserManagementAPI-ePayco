import type { TRequest,TResponse,TNextFunction } from 'types/TRouter'
import { validateToken } from '../utils/jwt'

const verifyJWT  = ( req:TRequest, res:TResponse, next:TNextFunction ): void => {
    const authHeader = req.headers.authorization

    if (!authHeader ) {
        res.status(401).json({ message: 'Token requerido' })
        return  
    }
    
    const token = authHeader.split(' ')[1]
    const payload = validateToken(token)

   if (!payload || typeof payload === 'string') {
        res.status(403).json({ message: 'Token inválido' });
        return;
    }
    // Aquí asumimos que el payload tiene la propiedad userName
    req.userName = payload.userName; // Aseguramos de que userName esté en el JwtPayload y sea un string
    next(); // Llama a next() para continuar con la siguiente función
}

export default verifyJWT