import mongoose from "mongoose";    
import 'dotenv/config'
import chai from 'chai'
import supertest from 'supertest'

const expect = chai.expect

const requester = supertest('http://localhost:8080')

await mongoose.connect(process.env.MONGO_URL)

/*describe('Test CRUD de Productos en la ruta api/products', function () {
    it('Ruta api/products metodo GET', async () => {

        const {statusCode, ok } = await requester.get('/api/products')
        expect(statusCode).to.be.equal(200)
        expect(ok).to.be.ok
        console.log(statusCode)
        console.log(ok)
    })
    
    it('Ruta api/products metodo POST', async () => {
        const newProduct = {
            title: "LAVARROPA",
            description: "Frontal",
            price: 180000,
            category: "ELECTRO",
            stock: 3,
            code: "120ASD321"
        }

        const {statusCode, _body, ok } = await requester.post('/api/products').send(newProduct)
        expect(statusCode).to.be.equal(201)
        //expect(_body.status).to.be.equal('sucess')
        //expect(ok).to.be.ok
        console.log(statusCode)
        console.log(_body)
        console.log(ok)
    })


    it('Ruta api/products metodo GET', async () => {
        const id = '6505ab053260312475dd7dcd'

        const {statusCode, ok } = await requester.get(`/api/products/${id}`)
        expect(statusCode).to.be.equal(200)
        expect(ok).to.be.ok
        console.log(statusCode)
        console.log(ok)
    })

    it('Ruta api/products metodo PUT', async () => {
        const id = '6505ab053260312475dd7dcc'
        const updateProduct = {
            title: "LAVARROPA",
            description: "Frontal",
            price: 180000,
            category: "ELECTRO",
            stock: 7,
            code: "123ASD321"
        }

        const {statusCode, ok } = await requester.put(`/api/products/${id}`).send(updateProduct)
        expect(statusCode).to.be.equal(200)
        expect(ok).to.be.ok
        console.log(statusCode)
        console.log(ok)
    })

    it('Ruta api/products metodo DELETE', async () => {
        const id = '6505ab053260312475dd7dcc'
        const {statusCode, ok } = await requester.delete(`/api/products/${id}`)
        expect(statusCode).to.be.equal(200)
        expect(ok).to.be.ok
        console.log(statusCode)
        console.log(ok)
    })

})*/

/*describe('Test CRUD de Session en la ruta api/sessions', function () {
    let cookie = {}

    it('Ruta api/sessions/signUp con metodo POST', async () => {
        const newUser = {
            name: "Cristina",
            lastName: "Jaime",
            age: 45,
            email: "jaimesas@jaimesas.com",
            password: "1234"
        }

        const {statusCode} = await requester.post('/api/sessions/signUp').send(newUser)

        expect(statusCode).to.be.equal(200)
    })

    it('Ruta api/sessions/login con metodo POST', async () => {
        const user = {
            email: "pedr@pedraza.com",
            password: "1234"
        }

        const resultado = await requester.post('/api/sessions/login').send(user)
        const cookieResult = resultado.header['set-cookie'][0]
        expect(cookieResult).to.be.ok
        cookie = {
            name: cookieResult.split("=")[0],
            value: cookieResult.split("=")[1]
        }
        expect(cookie.name).to.be.ok.and.equal('jwtCookie')
        expect(cookie.value).to.be.ok
    })

    it('Ruta api/sessions/current con metodo GET', async () => {

        const {_body} = await requester.get('/api/sessions/current').set('Cookie', [`${cookie.name} = ${cookie.value}`])
        console.log(_body.payload)
        expect(_body.payload.user.email).to.be.equal("admin@admin.com")
        
    })
})*/


describe('Test CRUD de Productos en la ruta api/carts', function () {
    let cookie = {}
    it('Ruta api/sessions/login con metodo POST', async () => {
        const user = {
            email: "pedr@pedraza.com",
            password: "1234"
        }

        const resultado = await requester.post('/api/sessions/login').send(user)
        const cookieResult = resultado.header['set-cookie'][0]
        expect(cookieResult).to.be.ok
        cookie = {
            name: cookieResult.split("=")[0],
            value: cookieResult.split("=")[1]
        }
        expect(cookie.name).to.be.ok.and.equal('jwtCookie')
        expect(cookie.value).to.be.ok
    })
    
    it('Ruta api/carts metodo POST', async () => {
        const cid = '657e19f30ddd41460653b805'
        const pid = '6505ab043260312475dd7d6c'
        const postProductInCart = {
            quantity: 7
        }

        const {statusCode, ok } = await requester.post(`/api/carts/${cid}/products/${pid}`).send(postProductInCart)
        expect(statusCode).to.be.equal(200)
        expect(ok).to.be.ok
        console.log(statusCode)
        console.log(ok)
    })
})

