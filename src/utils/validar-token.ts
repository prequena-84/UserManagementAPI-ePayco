import bodyParser from 'body-parser'
import ISR from '../class/class-router'

import type { TRequest, TResponse } from 'types/TRouter'
import verifyJWT from '../middleware/auth.middleware'

const CR = new ISR(), Router = CR.Router()

Router.use(bodyParser.json())

Router.post("/", verifyJWT, (req:TRequest, res:TResponse): void => {
    res.json({ message: 'Autorizado', user: req/*.userName*/ })
})

export default Router;