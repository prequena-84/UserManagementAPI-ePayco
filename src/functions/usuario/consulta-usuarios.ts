import path from 'path'
import type { IUsuario } from 'interfaces/IUsuario'
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') })

const uriConsultaTodosLosUsuarios = process.env.URI_API_CONSULTA_ALL_USUARIO || ""

export default async function consultaUsuarios(): Promise<IUsuario[]> {
    try {
        const response = await fetch(uriConsultaTodosLosUsuarios, {
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