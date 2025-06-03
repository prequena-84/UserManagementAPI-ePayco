// Importacion de librerias o componentes
import routerInstance from "./class/class-router"
import cors from 'cors'
import { PORT } from './config/config-app'

// Importación Servicios del modulo de Cliente
import USUARIO from './services/servicio-usuario'
import TRANSACCIONES from './services/servicio-transaccion'
import SOLICITUD_TOKEN from './controllers/user.controller'

// Importacio clase del Router
const CS = new routerInstance()
const servidor = CS.Servidor()

servidor.use( cors() )

// Importacion de Tipos o interfaces
import type { TRequest, TResponse } from 'types/TRouter' 

servidor.all( '/', ( _req:TRequest, res:TResponse ) => {
    res.send('Bienvenido a la API de Servicios del cliente ePayco')
})

// Definicion de las rutas de las consultas entre APIs
servidor.use( '/API/V2/usuario', USUARIO )
servidor.use( '/API/V2/transaccion', TRANSACCIONES )
servidor.use( '/API/V2/solicitar-token', SOLICITUD_TOKEN )

servidor.listen( PORT, () => console.log(`Servidor corriendo en: http://localhost:${PORT}`) )