import path from 'path'
import bodyParser from 'body-parser'
import routerInstancia from '../../class/class-router'
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') })

import axios from 'axios'

import type { TRequest,TResponse } from 'types/TRouter'

const uriTransaccion = process.env.URI_API_REPORTE_TRANSACCIONES || ''
const CR = new routerInstancia(), Router = CR.Router()

Router.use(bodyParser.json())

Router.get('/', async ( _req:TRequest, res:TResponse ): Promise<void> => {
    try {
        const response = await axios.get(uriTransaccion)
        
        res.status(200).send({
            data:response.data.data,
            message: response.data.message,
        })
        
    } catch(err) {
        res.status(500).send({
            data:null,
            message:`Error en la consulta: ${err}`,
        })
    }
})

export default Router