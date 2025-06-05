import bodyParser from 'body-parser'
import routerInstancia from '../../class/class-router'
import consultaDocUsuario from '../../functions/consulta-doc-Usuario'
import agregarTransaccion from '../../functions/agregar-transaccion'
import modificarUsuario from   '../../functions/modificacion-doc-usuario'
import type { ITransaccion } from 'interfaces/ITransaccion'
import type { TRequest,TResponse } from 'types/TRouter'

const CR = new routerInstancia(), Router = CR.Router()

Router.use(bodyParser.json())

Router.post('/', async ( req:TRequest, res:TResponse ): Promise<void> => {
    try {
        const 
            datoTransaccion:ITransaccion = req.body.datoTransaccion,
            { usuario_doc,tipo,celular,monto } = datoTransaccion,
            datosUsuario = await consultaDocUsuario({documento:usuario_doc})

        if ( tipo === "recarga" ) {

            if ( datosUsuario.celular === celular ) {

                datoTransaccion.status = "confirmada"
            } else {            
                res.status(403).send({
                    data:null,
                    message: `Datos Invalidos`,
                })
            }

           const respData: ITransaccion = await agregarTransaccion(datoTransaccion)

            if ( respData.status  === "confirmada" ) {
                datosUsuario.saldo += monto

                console.log('revision del saldo del usuario', datosUsuario)

                console.log('revision de la respuesta de la modificacion del usuario',await modificarUsuario(datosUsuario))
            }

            res.status(200).send({
                data: respData,
                message:`Se ha registrado la transaccion #${respData.id} sastifactoriamente`,
            })

        } else {
            if ( datosUsuario.saldo >= monto ) {

                const respData: ITransaccion = await agregarTransaccion(datoTransaccion)

                res.status(200).send({
                    data: respData,
                    message:`Se ha registrado la transaccion #${respData.id} sastifactoriamente`,
                })
                
            } else {

                res.status(403).send({
                    data:null,
                    message: 'Saldo insuficiente, por favor recarge',
                })
            }
        }

    } catch(err) {
        res.status(500).send({
            data:null,
            message:`Datos Invalidos:${err}`,
        })
    }
})

export default Router