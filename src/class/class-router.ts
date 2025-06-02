import express, { Router, Express } from 'express'

export default class routerInstancia {
    constructor(){
    }

    Servidor():Express {
        return express() 
    }

    Router():Router {
        return Router()
    }
}