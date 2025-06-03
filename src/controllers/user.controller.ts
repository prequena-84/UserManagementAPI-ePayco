// Importación de Componentes
import { generateToken } from '../utils/validacion-token'
import ISR from '../class/class-router'
import bodyParser from 'body-parser'
import axios from 'axios'

import sendEmailToken from '../modules/envio-mail/envio-mail'

// Importacion de typos e interfaces de TypeScript
import type { TRequest,TResponse } from 'types/TRouter'

// Importación del sservicio consulta del servicio de la base de datos
const uriConsultaDocUsuario = process.env.URI_API_CONSULTA_DOC_USUARIOS || ''
const uriConsultaIdTransaccion:string = process.env.URI_API_CONSULTA_ID_TRANSACCIONES || ''
const uriModificarTransaccion =  process.env.URI_API_ACTUALIZAR_TRANSACCIONES || ''

const CR = new ISR(), Router = CR.Router()

Router.use(bodyParser.json())

Router.post('/', async ( req:TRequest, res:TResponse ) => {
    try {
        const datoDocumento = req.body
        if ( !datoDocumento.documento || !datoDocumento.idTransaccion ) res.status(400).json({ message: 'Datos incompletos' })

        const datosTransaccion = await axios.post(uriConsultaIdTransaccion, {datoDocumento})    
        const datosUsuario = await axios.post(uriConsultaDocUsuario, {datoDocumento})
    
        if ( datosTransaccion.data.data.usuario_doc === datoDocumento.documento && datosTransaccion.data.data.status === "pendiente" && datosTransaccion.data.data.tipo === "pago") {

            const tokkenSesion = generateToken()
            datosTransaccion.data.data.token_confirmacion = tokkenSesion.token
            datosTransaccion.data.data.session_Exp = tokkenSesion.timeExp
            const responseRegSessionToken = await axios.post(uriModificarTransaccion, datosTransaccion.data.data )

            const response = await sendEmailToken(
                datosUsuario.data.data.email,
                datosUsuario.data.data.nombre,
                responseRegSessionToken.data.data.token_confirmacion,
            )

            res.status(200).json({ 
                data:response,
                message: 'Se ha enviado el mail con el token para validarlo'
            })

        } else {
            res.status(401).json({ message: 'No Autorizado, Error en los datos de la autorizacion' })
        }

    } catch(err) {
         res.status(500).json({ message: `se presento este error: ${err}` })
    }
})

export default Router