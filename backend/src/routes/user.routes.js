import { getUsers, getUserById, updateProfilePicture, updateDocuments, updateProductsImage, putUserById, deleteUserById, recoveryPassword, resetPassword } from "../controllers/user.controller.js";
import { Router } from "express";
import { passportError, authorization } from "../utils/messagesError.js";
import { upload } from "../config/multer.js";
const userRouter = Router()

userRouter.get( '/', passportError('jwt'), authorization('admin'), getUsers)
userRouter.get( '/:id', passportError('jwt'), authorization('admin'), getUserById)
userRouter.put( '/:id', passportError('jwt'), authorization('admin'), putUserById)
userRouter.delete( '/:id', passportError('jwt'), authorization('admin'), deleteUserById)
userRouter.post( '/password-recovery', recoveryPassword)
userRouter.post( '/reset-password/:token', resetPassword)
userRouter.post('/:uid/documents',upload.array('documents'), updateDocuments);
userRouter.post('/:uid/profiles', upload.single('profileImage'), updateProfilePicture)
userRouter.post('/:uid/products', upload.single('productImage'), updateProductsImage)
/*userRouter.get( '/', async (req, res) => {
    try{
        const users = await userModel.find.limit()
        res.status(200).send({respuesta: 'OK', mensaje: users})
    } catch (error) {
        res.status(400).send({respuesta: "Error en consultar usuario", mensaje: error})
    }
})*/

/*userRouter.get( '/:id', async (req, res) => {
    const {id} = req.params
    try{
        const user = await userModel.findById(id)
        if(user)
            res.status(200).send({respuesta: 'OK', mensaje: user})
        else
            res.status(404).send({respuesta: 'Error en consultar usuario', mensaje:"User Not Found",})
    } catch (error) {
        res.status(400).send({respuesta: "Error en consultar usuario", mensaje: error})
    }
})*/

//create user sin passport
/*userRouter.post( '/', async (req, res) => {
    const {name, lastName, age, email, password, rol } = req.body
    try{
        const user = await userModel.create({name, lastName, age, email, password, rol})
        res.status(200).send({respuesta: 'OK', mensaje: user})
    } catch (error) {
        res.status(400).send({respuesta: "Error en crear usuario", mensaje: error})
    }
})*/

/*userRouter.put( '/:id', async (req, res) => {
    const {id} = req.params
    const {name, lastName, age, email, password } = req.body
    try{
        const user = await userModel.findByIdAndUpdate(id, {name, lastName, age, email, password })
        if(user)
            res.status(200).send({respuesta: 'OK', mensaje: user})
        else
            res.status(404).send({respuesta: 'Error en actualizar usuario', mensaje:"User Not Found",})
    } catch (error) {
        res.status(400).send({respuesta: "Error en actualizar usuario", mensaje: error})
    }
})*/

/*userRouter.delete( '/:id', async (req, res) => {
    const {id} = req.params
    try{
        const user = await userModel.findByIdAndDelete(id)
        if(user)
            res.status(200).send({respuesta: 'OK', mensaje: user})
        else
            res.status(404).send({respuesta: 'Error en eliminar usuario', mensaje:"User Not Found",})
    } catch (error) {
        res.status(400).send({respuesta: "Error en eliminar usuario", mensaje: error})
    }
})*/

export default userRouter