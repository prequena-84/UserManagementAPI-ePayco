import path from 'path'
import bodyParser from 'body-parser'
import routerInstancia from '../../class/class-router'
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') })

import axios from "axios"

import type { ITransaccion } from 'interfaces/ITransaccion'
import type { TRequest,TResponse } from 'types/TRouter'

const CR = new routerInstancia(), Router = CR.Router()

const uriAgregarTransaccion = process.env.URI_API_REGISTRO_TRANSACCIONES || ''
const uriConsultaDocUsuario = process.env.URI_API_CONSULTA_DOC_USUARIOS || ''
const uriModificarUsuario = process.env.URI_API_MODIFICACION_USUARIO || ''

Router.use(bodyParser.json())

Router.post('/', async ( req:TRequest, res:TResponse ): Promise<void> => {
    try {
        const datoTransaccion:ITransaccion = req.body.datoTransaccion
        let respTransaccion = null

        const datoDocumento = {
            documento:datoTransaccion.usuario_doc,
            celular:datoTransaccion.celular,
        }
    
        const datosUsuario = await axios.post(uriConsultaDocUsuario, {
            datoDocumento
        })

        if ( datoTransaccion.tipo === "recarga" ) {

            if ( datoDocumento.celular === datosUsuario.data.data.celular ) {

                datoTransaccion.status = "confirmada"
            } else {            
                res.status(403).send({
                    data:null,
                    message: `Datos Invalidos`,
                })
            }

            respTransaccion = await axios.post(uriAgregarTransaccion, {
                datoTransaccion
            })  

            if ( respTransaccion.data.data.status === "confirmada" ) {
                datosUsuario.data.data.saldo +=  datoTransaccion.monto
                await axios.post(uriModificarUsuario, datosUsuario.data.data )
            }

        } else {

            if ( datosUsuario.data.data.saldo >= datoTransaccion.monto ) {
                respTransaccion = await axios.post(uriAgregarTransaccion, {
                    datoTransaccion
                })  
            } else {
                res.status(403).send({
                    data:null,
                    message: 'Saldo insuficiente, por favor recarge',
                })
            }
        }
        
        res.status(200).send({
            data:respTransaccion?.data,
            message: respTransaccion?.data.message,
        })

    } catch(err) {
        res.status(500).send({
            data:null,
            message:`Datos Invalidos:${err}`,
        })
    }
})

export default Router