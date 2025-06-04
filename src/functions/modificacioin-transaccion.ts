import type { ITransaccion } from "interfaces/ITransaccion"

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

        console.log('revision de fetch', data.data)
        return data.data

    } catch(err) {
        return null
        console.log(err)
    }
}