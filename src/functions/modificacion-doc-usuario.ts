import type { IUsuario } from "interfaces/IUsuario"

const uriModificarTransaccion =  process.env.URI_API_ACTUALIZAR_TRANSACCIONES || ''

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
        console.log(err)
        return null
    }
}