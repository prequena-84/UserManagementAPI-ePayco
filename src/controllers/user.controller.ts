// Importación de Componentes
import { generateToken } from '../utils/jwt'
import ISR from '../class/class-router'
import bodyParser from 'body-parser'

// Importacion de typos e interfaces de TypeScript
import type { TRequest,TResponse } from 'types/TRouter'
//import type { IUser } from 'interfaces/Iuser'

// Importación de Encryptación de contraseña
import bcrypt from 'bcrypt'

// Importación del sservicio consulta del servicio de la base de datos

const dataUsers = []
const CR = new ISR(), Router = CR.Router()

Router.use(bodyParser.json())

Router.post('/', async ( req:TRequest, res:TResponse ) => {
    try {
        const { userName, Password } = req.body.dataUser
        if ( !userName || !Password ) res.status(400).json({ message: 'Datos incompletos' })
        
        // Insertar con sulta a la API    
        //await connectDB()
        //const userDB = await User.findOne( {userName:userName} );

        const userValidation = ''//await bcrypt.compare(Password, userDB?.Password || '')

        if ( userValidation ) {
            dataUsers.push({ userName, Password })
            const token = generateToken(userName)

            res.status(201).json({ message: 'Autorizado', token })
        } else {

            res.status(401).json({ message: 'No Autorizado' })
        }
    } catch(err) {
         res.status(500).json({ message: `se presento este error: ${err}` })
    }
})

export default Router