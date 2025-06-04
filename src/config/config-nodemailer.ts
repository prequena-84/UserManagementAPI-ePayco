import path from 'path'
import type { IConfigNodemailer } from "interfaces/IConfig-nodemailer";
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') })

const configTransporter:IConfigNodemailer = {
    host:"smtp.gmail.com",
    port:587,
    secure:false,
    auth: {
        user:process.env.CONFIG_USER,
        pass:process.env.CONFIG_PASS,
    },
    tls: {
        rejectUnauthorized:false,
    },
};

const configCuerpoEmail = (nombre: string, token: string | null) => `
  <div style="font-family: Arial, sans-serif; max-width: 500px; margin: auto; border: 1px solid #eaeaea; padding: 20px; border-radius: 8px;">
    <h2 style="color: #333;">Hola ${nombre},</h2>
    <p>Tu código de verificación es:</p>
    <p style="font-size: 24px; font-weight: bold; color: #007BFF;">${token}</p>
    <p>Este código es válido por los próximos 5 minutos.</p>
    <hr />
    <p style="font-size: 12px; color: #999;">Si no solicitaste este código, puedes ignorar este mensaje.</p>
    <p style="font-size: 12px; color: #999;">Gracias,<br>El equipo de ePayco</p>
  </div>
`;

export { 
    configTransporter,
    configCuerpoEmail,
}