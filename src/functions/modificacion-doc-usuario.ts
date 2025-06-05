import path from 'path'
import type { IUsuario } from "interfaces/IUsuario"
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') })

const uriModificarTransaccion =  process.env.URI_API_MODIFICACION_USUARIO || ''

export default async function modificacionUsuario( datoUsuario:IUsuario ) {
    try {      

        const response = await fetch(uriModificarTransaccion, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(datoUsuario),
        })
        
        const data = await response.json()
        return data.data

    } catch(err) {
        console.error(err)
        return null
    }
}