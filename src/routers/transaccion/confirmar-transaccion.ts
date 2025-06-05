import path from 'path'
import bodyParser from 'body-parser'
import routerInstancia from '../../class/class-router'

import type { IUsuario } from 'interfaces/IUsuario'
import type { ITransaccion } from 'interfaces/ITransaccion'
import type { TRequest,TResponse } from 'types/TRouter'

import consultaDocUsuario from '../../functions/consulta-doc-Usuario'
import consultaIdTransaccion from '../../functions/consulta-id-transaccion'
import modificacionTransaccion from '../../functions/modificacioin-transaccion'
import modificacionUsuario from '../../functions/modificacion-doc-usuario'
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') })

const CR = new routerInstancia(), Router = CR.Router()
Router.use(bodyParser.json())

Router.post('/', async ( req:TRequest, res:TResponse ): Promise<void> => {
    try {
        const datoDocumento: IUsuario | ITransaccion  = req.body
        const datosUsuario = await consultaDocUsuario(datoDocumento), { documento,saldo } = datosUsuario
        const datosTransaccion = await consultaIdTransaccion(datoDocumento), { usuario_doc,monto  } = datosTransaccion

        if ( documento === usuario_doc ) {
            if ( saldo >= monto  ) {

                datosTransaccion.status = 'confirmada'
                datosUsuario.saldo -= monto

                await modificacionTransaccion(datosUsuario)
                await modificacionUsuario(datosTransaccion)

                res.status(200).send({
                    data:'Se ha confirmado la Transaccion',
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