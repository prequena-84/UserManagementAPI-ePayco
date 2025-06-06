import bodyParser from 'body-parser'
import routerInstancia from '../../class/class-router'
import consultaDocUsuario from '../../functions/usuario/consulta-doc-Usuario'
import consultaIdTransaccion from '../../functions/transaccion/consulta-id-transaccion'
import modificacionTransaccion from '../../functions/transaccion/modificacioin-transaccion'
import modificacionUsuario from '../../functions/usuario/modificacion-doc-usuario'

import type { IUsuario } from 'interfaces/IUsuario'
import type { ITransaccion } from 'interfaces/ITransaccion'
import type { TRequest,TResponse } from 'types/TRouter'

const CR = new routerInstancia(), Router = CR.Router()
Router.use(bodyParser.json())

Router.post('/', async ( req:TRequest, res:TResponse ): Promise<void> => {
    try {
        const datoDocumento  = req.body
        const datosUsuario:IUsuario = await consultaDocUsuario(datoDocumento), { documento,saldo }:IUsuario = datosUsuario
        const datosTransaccion:ITransaccion = await consultaIdTransaccion(datoDocumento), { usuario_doc,monto  }: ITransaccion = datosTransaccion

        if ( documento === usuario_doc ) {
            if ( saldo >= monto  ) {

                datosTransaccion.status = 'confirmada'
                datosUsuario.saldo -= monto

                await modificacionUsuario(datosUsuario)
                await modificacionTransaccion(datosTransaccion)

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
            res.status(401).send({
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