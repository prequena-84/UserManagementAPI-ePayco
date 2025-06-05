import path from 'path'
import type { ITransaccion } from "interfaces/ITransaccion"
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') })

const uriAgregarTransaccion = process.env.URI_API_REGISTRO_TRANSACCIONES || ''

export default async function agregarTransacciones( datoTransaccion:ITransaccion ): Promise<ITransaccion> {
    try {
        const response = await fetch(uriAgregarTransaccion, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(datoTransaccion),
        })

        const data = await response.json()

        console.log('revision de fetch', data.data)
        return data.data

    } catch(err) {
        console.error(err)
        return err as ITransaccion
    }
}