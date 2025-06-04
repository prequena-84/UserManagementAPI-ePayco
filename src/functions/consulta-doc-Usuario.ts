import type { IUsuario, } from "interfaces/IUsuario" 

const uriConsultaDocUsuario = process.env.URI_API_CONSULTA_DOC_USUARIOS || ''

export default async function consultaDocUsuario( datoDocumento:IUsuario ) {
    try {
        
        const response = await fetch(uriConsultaDocUsuario, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(datoDocumento),
        })

        const data = await response.json()
        return data.data

    } catch(err) {
        return null
        console.log(err)
    }
}