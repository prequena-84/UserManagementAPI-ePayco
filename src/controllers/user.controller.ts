// Importación de Componentes
import { generateToken } from '../utils/validacion-token'
import ISR from '../class/class-router'
import bodyParser from 'body-parser'
import consultaDocUsuario from '../functions/consulta-doc-Usuario'
import consultaIdTransaccion from '../functions/consulta-id-transaccion'
import modificacionTransaccion from '../functions/modificacioin-transaccion'
import sendEmailToken from '../modules/envio-mail/envio-mail'

// Importacion de typos e interfaces de TypeScript
import type { TRequest,TResponse } from 'types/TRouter'
import type { IUsuario } from 'interfaces/IUsuario'
import { ITransaccion } from 'interfaces/ITransaccion'

const CR = new ISR(), Router = CR.Router()
Router.use(bodyParser.json())

Router.post('/', async ( req:TRequest, res:TResponse ) => {
    try {
        const datoDocumento = req.body, { documento, id } = datoDocumento

        if ( !documento || !id ) res.status(400).json({ message: 'Datos incompletos' })
        const datosUsuario:IUsuario = await consultaDocUsuario(datoDocumento)
        const datosTransaccion: ITransaccion = await consultaIdTransaccion(datoDocumento)
        const tokkenSesion = generateToken()

        if ( datosTransaccion.usuario_doc === documento && datosTransaccion.status === "pendiente" && datosTransaccion.tipo === "pago") {
            datosTransaccion.token_confirmacion = tokkenSesion.token
            datosTransaccion.session_Exp = tokkenSesion.timeExp
            const { token_confirmacion } = await modificacionTransaccion(datosTransaccion) as ITransaccion;
            
            res.status(200).json({ 
                data:await sendEmailToken(datosUsuario.email,datosUsuario.nombre,token_confirmacion),
                message: 'Se ha enviado el mail con el token para validarlo'
            })
        } else {

            res.status(401).json({ message: 'No Autorizado, Error en los datos de la autorizacion' })
        }
    } catch(err) {
        console.error(err)
        res.status(500).json({ message: `Se presento este error: ${err}` })
    }
})

export default Router