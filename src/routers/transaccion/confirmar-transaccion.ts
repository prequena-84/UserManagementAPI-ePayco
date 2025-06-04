import path from 'path'
import bodyParser from 'body-parser'
import routerInstancia from '../../class/class-router'
import axios from "axios"

import type { IToken } from 'interfaces/IToken'
import type { TRequest,TResponse } from 'types/TRouter'

require('dotenv').config({ path: path.resolve(__dirname, '../../.env') })

const CR = new routerInstancia(), Router = CR.Router()

const uriConsultaDocUsuario = process.env.URI_API_CONSULTA_DOC_USUARIOS || ''
const uriConsultaIdTransaccion = process.env.URI_API_CONSULTA_ID_TRANSACCIONES || ''
const uriModificarUsuario = process.env.URI_API_MODIFICACION_USUARIO || ''
const uriModificarTransaccion =  process.env.URI_API_ACTUALIZAR_TRANSACCIONES || ''

Router.use(bodyParser.json())

Router.post('/', async ( req:TRequest, res:TResponse ): Promise<void> => {
    try {
        const datoDocumento:IToken = req.body
        const datosUsuario = await axios.post(uriConsultaDocUsuario,{ datoDocumento })
        const datosTransaccion = await axios.post(uriConsultaIdTransaccion,{ datoDocumento })

        if ( datosUsuario.data.data.documento === datosTransaccion.data.data.usuario_doc ) {
            if ( datosUsuario.data.data.saldo >= datosTransaccion.data.data.monto  ) {

                datosTransaccion.data.data.status = 'confirmada'
                datosUsuario.data.data.saldo -= datosTransaccion.data.data.monto

                await axios.post(uriModificarUsuario, datosUsuario.data.data )
                await axios.post(uriModificarTransaccion, datosTransaccion.data.data )

                res.status(200).send({
                    data:null,
                    message: 'Se ha confirmado la Transaccion',
                })
                
            } else {

                res.status(200).send({
                    data:null,
                    message: 'El saldo que tiene en la cuenta es insuficiente por favor recargue',
                })
            }
        } else {

            res.status(200).send({
                data:null,
                message: 'El numero de documento no coincide con el registrado en la transacción, por favor reviselo',
            })
        }

    } catch(err) {
        res.status(500).send({
            data:null,
            message: `Confirmacion Invalida por el siguiente Error: ${err}`,
        })
    }
})

export default Router