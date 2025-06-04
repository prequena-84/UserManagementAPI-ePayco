import type { ITransaccion } from "interfaces/ITransaccion"

const uriConsultaIdTransaccion:string = process.env.URI_API_CONSULTA_ID_TRANSACCIONES || ''

export default async function consultaIdTransaccion( datoTransaccion:ITransaccion ) {
    try {
        
        const response = await fetch(uriConsultaIdTransaccion, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(datoTransaccion),
        })

        const data = await response.json()
        return data.data

    } catch(err) {
        return null
        console.log(err)
    }
}