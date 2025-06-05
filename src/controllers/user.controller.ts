// Importación de Componentes
import { generateToken } from '../utils/validacion-token'
import ISR from '../class/class-router'
import bodyParser from 'body-parser'
import consultaDocUsuario from '../functions/usuario/consulta-doc-Usuario'
import consultaIdTransaccion from '../functions/transaccion/consulta-id-transaccion'
import modificacionTransaccion from '../functions/transaccion/modificacioin-transaccion'
import sendEmailToken from '../modules/envio-mail/envio-mail'

// Importacion de typos e interfaces de TypeScript
import type { IUsuario } from 'interfaces/IUsuario'
import type { ITransaccion } from 'interfaces/ITransaccion'
import type { IToken } from 'interfaces/IToken'
import type { TRequest,TResponse } from 'types/TRouter'

const CR = new ISR(), Router = CR.Router()
Router.use(bodyParser.json())

Router.post('/', async ( req:TRequest, res:TResponse ) => {
    try {
        const datoDocumento = req.body, { documento }:IUsuario = datoDocumento

        if ( !documento || !datoDocumento.id ) res.status(400).json({ message: 'Datos incompletos' })
            
        const datosUsuario:IUsuario = await consultaDocUsuario(datoDocumento), { email, nombre, saldo }:IUsuario = datosUsuario || []
        const datosTransaccion: ITransaccion = await consultaIdTransaccion(datoDocumento), { id,usuario_doc,status,tipo,monto }: ITransaccion = datosTransaccion || []

        if ( id !== undefined ) {
            const { token,timeExp }:IToken = generateToken()

            if ( usuario_doc === documento && status === "pendiente" && tipo === "pago" && saldo >= monto ) {
                datosTransaccion.token_confirmacion = token
                datosTransaccion.session_Exp = timeExp

                const { token_confirmacion }:ITransaccion = await modificacionTransaccion(datosTransaccion) as ITransaccion;

                res.status(200).json({ 
                    data:await sendEmailToken(email,nombre,token_confirmacion),
                    message: 'Se ha enviado el mail con el token para validarlo'
                })
            } else if (usuario_doc !== documento) {

                res.status(401).json({ message: 'No Autorizado, Ha ingresado un número de Documento invalido para esta transacción' })
            } else if (status !== "pendiente") {

                res.status(401).json({ message: 'No Autorizado, Esta transacción se encuentra Confirmada' })
            } else if (tipo !== "pago") {

                res.status(401).json({ message: 'No Autorizado, Seleccione una transacción de tipo de Pago' })
            } else if (saldo <= monto) {

                res.status(401).json({ message: 'No Autorizado, Fondos insuficientes por favor recargue la cuenta' })
            } 
        } else if (id === undefined) {

            res.status(401).json({ message: 'No Autorizado, Ingrese un numero de Transacción valido' })
        }

    } catch(err) {

        console.error(err)
        res.status(401).json({ message: 'No Autorizado, Ingrese un dato valido para solicitar el token' })
    }
})

export default Router