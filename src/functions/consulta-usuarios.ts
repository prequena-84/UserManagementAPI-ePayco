import path from 'path'
import type { ITransaccion } from "interfaces/ITransaccion"
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') })

const uriConsultaTodosLosUsuarios = process.env.URI_API_CONSULTA_ALL_USUARIO || ""

export default async function consultaUsuarios(): Promise<ITransaccion[]> {
    try {
        const response = await fetch(uriConsultaTodosLosUsuarios, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })

        const data = await response.json()

        console.log('revision de fetch', data.data)
        return data.data

    } catch(err) {
        console.error(err)
        return []
    }
}