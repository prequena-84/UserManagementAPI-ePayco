import path from 'path'
import type { ITransaccion } from "interfaces/ITransaccion"
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') })

const uriTransaccion = process.env.URI_API_REPORTE_TRANSACCIONES || ''

export default async function consultaTransacciones(): Promise<ITransaccion[]> {
    try {
        const response = await fetch(uriTransaccion, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })

        const data = await response.json()
        return data.data

    } catch(err) {
        console.error(err)
        return []
    }
}