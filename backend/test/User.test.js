import mongoose from "mongoose";    
import { userModel } from "../src/models/user.models.js";
import 'dotenv/config'
import Assert from 'assert'


await mongoose.connect(process.env.MONGO_URL)
const assert = Assert.strict

describe('Test Crud de Usuarios en la ruta api/users', function () {
    before( () => {
        console.log("Arrancando el test")
    })

    beforeEach( () => {
        console.log("Comienza el test!")
    })

    it('Obtener todos los usuarios mediante metodo GET', async () => {
        const users = await userModel.find()
        assert.strictEqual(Array.isArray(users), true)
    })
    //652b4f813c025129eff5fe64
    it('Obtener un usuario mediante metodo GET', async () => {
        const user = await userModel.findById('652b4f813c025129eff5fe64')
        //assert.strictEqual(typeof user, 'object')
        assert.ok(user._id)
    })

    it('Crear un usuario mediante metodo POST', async () => {
        const newUser = {
            name: "Agustin",
            lastName: "Perez",
            age: 40,
            email: "agustin@perez.com",
            password: "1234"
        }
        const user = await userModel.create(newUser)
        assert.ok(user._id)
    })
    
    it('Actualizar un usuario mediante metodo PUT', async () => {
        const updateUser = {
            name: "Daniel",
            lastName: "Perez",
            age: 40,
            email: "daniel@perez.com",
            password: "1234"
        }
        const user = await userModel.findByIdAndUpdate('652b4f813c025129eff5fe64', updateUser)
        assert.ok(user._id)
    })

    it('Eliminar un usuario mediante metodo DELETE', async () => {
        
        const deleteUser = await userModel.findByIdAndDelete('652b4f813c025129eff5fe64')
        assert.strictEqual(typeof deleteUser, 'object')
    })
})