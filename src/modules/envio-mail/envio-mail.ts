import path from 'path'
import nodemailer from "nodemailer"

require('dotenv').config({ path: path.resolve(__dirname, '../../.env') })

const email = process.env.CONFIG_EMAIL
const password = process.env.CONFIG_PASSWORD

console.log(email,password)

const cuerpoEmail = (nombre: string, token: string) => `
  <div style="font-family: Arial, sans-serif; max-width: 500px; margin: auto; border: 1px solid #eaeaea; padding: 20px; border-radius: 8px;">
    <h2 style="color: #333;">Hola ${nombre},</h2>
    <p>Tu código de verificación es:</p>
    <p style="font-size: 24px; font-weight: bold; color: #007BFF;">${token}</p>
    <p>Este código es válido por los próximos 5 minutos.</p>
    <hr />
    <p style="font-size: 12px; color: #999;">Si no solicitaste este código, puedes ignorar este mensaje.</p>
    <p style="font-size: 12px; color: #999;">Gracias,<br>El equipo de tu app</p>
  </div>
`;

const transporter = nodemailer.createTransport({
    //host: 'smtp.office365.com', // outlook
    host:'smtp.gmail.com',
    port: 567,
    secure: false,
    auth: {
        user:email,
        pass:password,
    },
});

const sendEmailToken = async (to: string, nombre: string, token: string) => {

    console.log(email)

    const opcionesEmail = {
        from:email,
        to,
        subject:"Código TOKEN",
        html:cuerpoEmail(nombre,token),    
    }

    try {

        const envioEmail = await transporter.sendMail(opcionesEmail)

        console.log('se envio el mail con el token', envioEmail.messageId)

    } catch(err) {

        console.log('Error enviando email:', err)
        return false

    }

}

export default sendEmailToken;