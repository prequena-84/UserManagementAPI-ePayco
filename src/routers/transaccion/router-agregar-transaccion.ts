import bodyParser from 'body-parser'
import routerInstancia from '../../class/class-router'
import consultaDocUsuario from '../../functions/usuario/consulta-doc-Usuario'
import agregarTransaccion from '../../functions/transaccion/agregar-transaccion'
import modificacionUsuario from '../../functions/usuario/modificacion-doc-usuario'
import type { IUsuario } from 'interfaces/IUsuario'
import type { ITransaccion } from 'interfaces/ITransaccion'
import type { TRequest,TResponse } from 'types/TRouter'

const CR = new routerInstancia(), Router = CR.Router()
Router.use(bodyParser.json())

Router.post('/', async ( req:TRequest, res:TResponse ): Promise<void> => {
    try {
        const datoTransaccion:ITransaccion = req.body.datoTransaccion, { usuario_doc,tipo,celular,monto }:ITransaccion = datoTransaccion

        const datosUsuario = await consultaDocUsuario({
            documento:usuario_doc,
            nombre:'', 
            email:'', 
            celular:'', 
            saldo:0,
        })

        if ( datosUsuario !== null ) {

            if ( tipo === "recarga" ) {
                if ( datosUsuario.celular === celular ) datoTransaccion.status = "confirmada"

                const respData: ITransaccion = await agregarTransaccion(datoTransaccion)
                if ( respData.status  === "confirmada" ) datosUsuario.saldo += monto

                console.log(datosUsuario)

                await modificacionUsuario(datosUsuario)

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
        
        } else {
            res.status(403).send({
                data:null,
                message: 'Ha ingresado un Documento que no existe en la base de datos',
            })
        }

    } catch(err) {
        res.status(500).send({
            data:null,
            message:`Datos Invalidos:${err}`,
        })
    }
})

export default Router