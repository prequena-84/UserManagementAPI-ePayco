import path from 'path'
import type { ITransaccion } from "interfaces/ITransaccion"
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') })

const uriModificarTransaccion =  process.env.URI_API_ACTUALIZAR_TRANSACCIONES || ''

export default async function modificacionTransaccion( datoTransaccion:ITransaccion ): Promise<ITransaccion | null> {
    try {
        const response = await fetch(uriModificarTransaccion, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(datoTransaccion),
        })

        const data = await response.json()
        return data.data

    } catch(err) {
        console.error(err)
        return null
    }
}