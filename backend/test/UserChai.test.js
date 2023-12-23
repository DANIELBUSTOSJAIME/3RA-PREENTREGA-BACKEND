import mongoose from "mongoose";    
import { userModel } from "../src/models/user.models.js";
import 'dotenv/config'
import chai from 'chai'

const expect = chai.expect
await mongoose.connect(process.env.MONGO_URL)

describe('Test Crud de Users con chai en la ruta api/users', function () {
    before( () => {
        console.log("Arrancando el test")
    })

    beforeEach( () => {
        console.log("Comienza el test!")
    })

    it('Obtener todos los usuarios mediante metodo GET', async () => {
        const users = await userModel.find()
        expect(Array.isArray(users)).to.be.ok
        expect(users).not.to.be.deep.equal([])
    })

    it('Obtener un usuario mediante metodo GET', async () => {
        const user = await userModel.findById('658710a22dc69f3413f911b9')
        expect(user).to.have.property('_id')
    })

    it('Crear un usuario mediante metodo POST', async () => {
        const newUser = {
            name: "Agustina",
            lastName: "Perez",
            age: 40,
            email: "agustina@perez.com",
            password: "1234"
        }
        const user = await userModel.create(newUser)
        expect(user).to.have.property('_id')
    })
    
    it('Actualizar un usuario mediante metodo PUT', async () => {
        const updateUser = {
            name: "Daniel",
            lastName: "Perez",
            age: 40,
            email: "daniel@perez.com",
            password: "1234"
        }
        const user = await userModel.findByIdAndUpdate('658710a22dc69f3413f911b9', updateUser)
        expect(user).to.have.property('_id')
    })

    it('Eliminar un usuario mediante metodo DELETE', async () => {
        
        const deleteUser = await userModel.findByIdAndDelete('658710a22dc69f3413f911b9')
        expect(deleteUser).to.be.ok
    })
})