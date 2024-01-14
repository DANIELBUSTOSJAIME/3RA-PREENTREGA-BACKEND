import { cartModel } from "../models/cart.models.js";
import { productModel } from "../models/products.models.js";
import { ticketModel } from "../models/ticket.models.js";
import { userModel } from "../models/user.models.js";
import { v4 as uuidv4 } from 'uuid';

export const getCartById = async (req, res) => {
    const {id} = req.params
    try{
        const cart = await cartModel.findById(id)
        if(cart)
            res.status(200).send({respuesta: 'OK', mensaje: cart})
        else
            res.status(404).send({respuesta: 'Error en consultar carrito', mensaje:"Product Not Found",})
    } catch (error) {
        res.status(400).send({respuesta: "Error en consultar carrito", mensaje: error})
    }
}

export const putCartById = async (req, res) => {
    const { cid } = req.params
    const productsArray = req.body.products
    if (!Array.isArray(productsArray)) {
        return res.status(400).send({ respuesta: 'Error', mensaje: 'Los productos deberian estar en un array' })
    }
    try {
        const cart = await cartModel.findById(cid)
        if (!cart) {
            throw new Error("Cart not found")
        }
        for (let prod of productsArray) {
            const indice = cart.products.findIndex(cartProduct => cartProduct.id_prod.toString() === prod.id_prod)
            if (indice !== -1) {
                cart.products[indice].quantity = prod.quantity
            } else {
                const exist = await productModel.findById(prod.id_prod)
                if (!exist) {
                    throw new Error(`Product with ID ${prod.id_prod} not found`)
                }
                cart.products.push(prod)
            }
        }
        const respuesta = await cartModel.findByIdAndUpdate(cid, cart)
        res.status(200).send({ respuesta: 'OK', mensaje: respuesta })
    } catch (error) {
        res.status(error.message.includes("Not found") ? 404 : 400).send({ respuesta: 'Error', mensaje: error.message })
    }
}

export const deleteCartById = async (req, res) => {
    const {cid} = req.params
    try{
        await cartModel.findByIdAndUpdate(cid, {products: []})
        res.status(200).send({respuesta: 'OK', mensaje: 'Carrito vacio'})
    } catch (error) {
        res.status(400).send({respuesta: "Error en vaciar productos del carrito", mensaje: error})
    }
}

export const postProductInCart = async (req, res) => {
    const {cid, pid} = req.params
    const {quantity} = req.body
    try{
        const cart = await cartModel.findById(cid)
        console.log(cart)
        if(cart){
            const prod = await productModel.findById(pid)
            console.log(prod)
            if(prod){
                const indice = cart.products.findIndex(product => product.id_prod.toString() === pid)
                if(indice != -1){
                    cart.products[indice].quantity = quantity
                } else{
                    cart.products.push({ id_prod: pid, quantity: quantity })
                }
                const respuesta = await cartModel.findByIdAndUpdate(cid, cart)
                res.status(200).send({respuesta: 'OK', mensaje: respuesta})
            } else {
                res.status(404).send({respuesta: 'Error en encontrar el producto', mensaje:"Product Not Found",})
            }   
        }
        else
            res.status(404).send({respuesta: 'Error en encontrar el carrito', mensaje:"Cart Not Found",})
    } catch (error) {
        res.status(400).send({respuesta: "Error en agregar producto al carrito", mensaje: error})
    }
}

export const putProductInCart = async (req, res) => {
    const { cid, pid } = req.params;
    const { quantity } = req.body;
    try {
        const cart = await cartModel.findById(cid);
        if (cart) {
            const prod = await productModel.findById(pid);
            if (prod) {
                const indice = cart.products.findIndex(product => product.id_prod.toString() === pid);
                if (indice !== -1) {
                    cart.products[indice].quantity = quantity;
                } else {
                    cart.products.push({ id_prod: pid, quantity: quantity });
                }
            }
        }
        const respuesta = await cartModel.findByIdAndUpdate(cid, cart);
        res.status(200).send({ respuesta: 'OK', mensaje: respuesta });
    } catch (error) {
        res.status(400).send({ respuesta: "Error en actualizar producto en el carrito", mensaje: error });
    }
}

export const deleteProductInCart = async (req, res) => {
    const { cid, pid } = req.params;
    try {
        const cart = await cartModel.findById(cid);
        if (cart) {
            const prod = await productModel.findById(pid);
            if (prod) {
                const indice = cart.products.findIndex(product => product.id_prod.toString() === pid);
                if (indice !== -1) {
                    cart.products.splice(indice, 1);
                }
                const respuesta = await cartModel.findByIdAndUpdate(cid, cart);
                res.status(200).send({ respuesta: 'OK', mensaje: respuesta });
            }
        }
    } catch (error) {
        res.status(400).send({ respuesta: "Error en agregar producto al carrito", mensaje: error });
    }
}


export const postPurchase = async (req, res) => {
        const {cid} = req.params
    
        try{
            const cart = await cartModel.findById(cid)
            const purchasedProducts = [];
            const purchaseFail = [];
    
            if(!cart){
                return res.status(404).send({ respuesta: 'No se logro encontrar el id', mensaje: 'Error' })
            }
    
                for(const item of cart.products){
                    const products = productModel.findById(item.id_prod);
    
                    if(!products){
                        purchaseFail.push(item.id_prod)
                        console.log(purchaseFail);
                        continue;
                    }
    
                if( products.stock >= item.quantity ){
                products.stock -= item.quantity;
                await products.save()
                purchasedProducts.push(item);
                console.log(purchasedProducts)
                }else{
                    purchaseFail.push(item.id_prod)
                    console.log(purchaseFail);
                }  
            }
    
            if(purchasedProducts.length > 0){
                console.log(purchasedProducts.length)
                const totalAmount = 0/*purchasedProducts.reduce((total, item)=> {
                    const product = cart.products.find(p=> p.id_prod.equals(item.id_prod));
                    return total + product.quantity * product.id_prod.price;
                }, 0)*/
    
                const ticket = await ticketModel.create({
                    code: uuidv4(),
                    amount: totalAmount,
                })
                console.log("ticket", ticket)
                /*cart.products= cart.products.filter(item => !purchasedProducts.includes(item));
                await cart.save();*/
    
                return res.status(200).send({respuesta: 'Ticket generado exitosamente', mensaje: ticket})
            }else {
                return res.status(404).send({respuesta: 'Error al generar ticket', mensaje: 'Error'})
            }
    
        }catch(error){
            console.error(error)
            res.status(500).send({error: 'Error al finalizar compra'})
        }
    }