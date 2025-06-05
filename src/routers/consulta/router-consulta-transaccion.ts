import bodyParser from 'body-parser'
import routerInstancia from '../../class/class-router'
import consultaTransacciones from '../../functions/transaccion/consulta-transacciones'
import type { ITransaccion } from 'interfaces/ITransaccion'
import type { TRequest,TResponse } from 'types/TRouter'

const CR = new routerInstancia(), Router = CR.Router()

Router.use(bodyParser.json())

Router.get('/', async ( _req:TRequest, res:TResponse ): Promise<void> => {
    try {
        const response: ITransaccion[] = await consultaTransacciones()

        res.status(200).send({
            data:response,
            message:'Se descargo los datos del Reporte',
        })

    } catch(err) {
        res.status(500).send({
            data:null,
            message:`Error en la consulta: ${err}`,
        })
    }
})

export default Router