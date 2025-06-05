import bodyParser from 'body-parser'
import routerInstancia from '../../class/class-router'
import consultaUsuarios from '../../functions/usuario/consulta-usuarios'
import type { IUsuario } from 'interfaces/IUsuario'
import type { TRequest,TResponse } from 'types/TRouter'

const CR = new routerInstancia(), Router = CR.Router()
Router.use(bodyParser.json())

Router.get('/', async ( _req:TRequest, res:TResponse ): Promise<void> => {
    try {
        const response: IUsuario[] = await consultaUsuarios()

        res.status(200).send({
            data:response,
            message:'Se descargo los datos del usuario sasrifactoriamente',
        })
        
    } catch(err) {
        res.status(500).send({
            data:null,
            message:`Error en la consulta de datos: ${err}`,
        })
    }
})

export default Router