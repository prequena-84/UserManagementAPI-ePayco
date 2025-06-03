// Importación de class Router y Servidor
import routerInstancia from '../class/class-router'

// Servicios VRouter Servicios
import AGREGAR_TRANSACCION from '../routers/transaccion/router-agregar-transaccion'
import CONSULTA_TRANSACCIONES from '../routers/consulta/router-consulta-transaccion'
import CONFIRMAR_TRANSACCION from '../routers/transaccion/confirmar-transaccion'


// Importación de tipos
import type { TRequest,TResponse } from 'types/TRouter'

// Instancia de la clase Servido y Router
const CR = new routerInstancia(), Router = CR.Router()

// Importación de la descripcion del servicio
Router.get('/', async( _req:TRequest, res:TResponse ): Promise<void> => {
    try {
        res.status(200).send({
            message:'Bienvenido al Servidor 2 Transacciones Cliente-Base de Datos',
        })
    } catch (err) {
        res.status(500).send({
            mensaje:`error en la peticion: ${err}`,
        })
    }
}) 

Router.use('/agregar', AGREGAR_TRANSACCION)
Router.use('/consulta', CONSULTA_TRANSACCIONES)
Router.use('/confirmar-transaccion', CONFIRMAR_TRANSACCION)

export default Router