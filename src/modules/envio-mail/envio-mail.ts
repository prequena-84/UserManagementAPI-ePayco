import nodemailer from "nodemailer"
import { configTransporter,configCuerpoEmail  } from '../../config/config-nodemailer';

const transporter = nodemailer.createTransport(configTransporter);

const sendEmailToken = async (to: string, nombre: string, token: string) => {

    const opcionesEmail = {
        from:configTransporter.auth?.user,
        to,
        subject:"Código TOKEN",
        html:configCuerpoEmail(nombre,token),    
    }

    try {
        const envioEmail = await transporter.sendMail(opcionesEmail)
        console.log(envioEmail)

        return `Se envio el mail con el token sastifactoriamente`
    } catch(err) {

        console.log('Error enviando email:', err)
        return `ocurrio este error : ${err}`
    }
}

export default sendEmailToken;