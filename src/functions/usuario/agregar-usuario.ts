import path from 'path'
import type { IUsuario, } from "interfaces/IUsuario" 
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') })

const uriAgregarUsuario = process.env.URI_API_REGISTRO_USUARIO || ""

export default async function agregarUsuario( datoDocumento:IUsuario ) {
    try {
        
        const response = await fetch(uriAgregarUsuario, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(datoDocumento),
        })

        const data = await response.json()
        return data.data

    } catch(err) {
        console.error(err)
        return null
    }
}