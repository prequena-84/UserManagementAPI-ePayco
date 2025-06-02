import path from 'path'
import bodyParser from 'body-parser'
import routerInstancia from '../../class/class-router'
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') })

import axios from 'axios'

import type { IUsuario } from 'interfaces/IUsuario'
import type { TRequest,TResponse } from 'types/TRouter'

const uriAgregarUsuario = process.env.URI_API_REGISTRO_USUARIO || ""

const CR = new routerInstancia(), Router = CR.Router()

Router.use(bodyParser.json())

Router.post('/', async ( req:TRequest, res:TResponse ): Promise<void> => {
    try {

        const datoUsuario:IUsuario = req.body.datoUsuario;
        const response = await axios.post(uriAgregarUsuario, {
            datoUsuario
        })

        res.status(200).send({
            data:response.data,
            message: response.data.message,
        })

    } catch(err) {
        res.status(500).send({
            data:null,
            message:`Error en el registro de datos: ${err}`,
        })
    }
})

export default Router