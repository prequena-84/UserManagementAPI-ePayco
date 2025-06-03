import type { TRequest,TResponse,TNextFunction } from 'types/TRouter'
import { validateToken } from '../utils/validacion-token'

const verifyToken  = async ( req:TRequest, res:TResponse, next:TNextFunction ): Promise<void> => {
    try {
        const datoDocumento = req.body
        const authHeader = req.headers.authorization

        if (!authHeader ) {
            res.status(401).json({ message: 'Token requerido' })
            return  
        }
        
        const token = authHeader.split(' ')[1]
        const respuesta:boolean = await validateToken(token,datoDocumento)

        if (respuesta === false) {
            res.status(403).json({ message: 'Token inválido' });
            return;
        }

        next();
    } catch (err) {
        res.status(500).json({ message: `Error en la Validacion del Token: ${err}` });
        return;
    }
}

export default verifyToken