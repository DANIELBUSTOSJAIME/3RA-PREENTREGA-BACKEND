import { getMessages, postMessages } from "../controllers/messages.controller.js";
import { Router } from "express";
import { passportError, authorization } from "../utils/messagesError.js";

const messagesRouter = Router()

messagesRouter.get( '/', getMessages)
messagesRouter.post( '/', passportError('jwt'), authorization('user'), postMessages)

/*messagesRouter.get( '/', async (req, res) => {
    try{
        const messages = await messagesModel.find()
        res.status(200).send({respuesta: 'OK', mensaje: messages})
    } catch (error) {
        res.status(400).send({respuesta: "Error en consultar mensajes", mensaje: error})
    }
})*/

/*messagesRouter.post( '/', async (req, res) => {
    const {email, message} = req.body
    try{
        const messages = await messagesModel.create({email, message})
        res.status(200).send({respuesta: 'OK', mensaje: messages})
    } catch (error) {
        res.status(400).send({respuesta: "Error en crear mensaje", mensaje: error})
    }
})*/

export default messagesRouter