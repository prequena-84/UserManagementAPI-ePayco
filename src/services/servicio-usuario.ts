// Importación de class Router y Servidor
import routerInstancia from '../class/class-router'

// Servicios VRouter Servicios
import AGREGAR_USUARIO from '../routers/usuarios/router-agregar-usuario'
import CONSULTA_ALL_USUARIOS from '../routers/consulta/router-consulta-all-usuario'

//import ACTUALIZAR_USUARIO from '../routers/usuario/router.modificar'
//import CONSULTA_USUARIO_DOCUMENTO from '../routers/consulta/router-consulta-doc-usuario'

// Importación de tipos
import type { TRequest,TResponse } from 'types/TRouter'

// Instancia de la clase Servido y Router
const CR = new routerInstancia(), Router = CR.Router()

// Importación de la descripcion del servicio
Router.get('/', async( _req:TRequest, res:TResponse ): Promise<void> => {
    try {
        res.status(200).send({
            message:'Bienvenido al Servicio de Clientes',
        })
    } catch (err) {
        res.status(500).send({
            mensaje:`error en la peticion: ${err}`,
        })
    }
}) 

Router.use('/agregar', AGREGAR_USUARIO)
Router.use('/consulta', CONSULTA_ALL_USUARIOS)

//Router.use('/actualizar', ACTUALIZAR_USUARIO)
//Router.use('/consulta-documento', CONSULTA_USUARIO_DOCUMENTO)

export default Router