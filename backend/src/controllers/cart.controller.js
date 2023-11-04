import { cartModel } from "../models/cart.models.js";
import { productModel } from "../models/products.models.js";
import { ticketModel } from "../models/ticket.models.js";

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

export const postPurchase = async (req, res, next) => {
    try {
      const cart = await cartModel.findById(req.params.cid).populate('products.id_prod');
      const failedProducts = [];
  
      for (const product of cart.products) {
        const availableStock = product.id_prod.stock;
        if (product.quantity > availableStock) {
          failedProducts.push(product.id_prod._id);
        } else {
          product.id_prod.stock = availableStock - product.quantity;
          await product.id_prod.save();
        }
      }
  
      const ticketData = {
        purchaser: req.user.email,
        cart: req.params.cid,
      };
  
      const newTicket = await generateTicket(ticketData);
  
      const remainingProducts = cart.products.filter((product) =>
        failedProducts.includes(product.id_prod._id)
      );
      cart.products = remainingProducts;
      await cart.save();
  
      res.json({ message: 'Compra finalizada con éxito' });
    } catch (error) {
      next(error);
    }
  };
  
  const generateTicket = async (ticketData) => {
    try {
      const cart = await cartModel
        .findById(ticketData.cart)
        .populate('products.id_prod');
      let totalAmount = 0;
  
      for (const product of cart.products) {
        totalAmount += product.quantity * product.id_prod.price;
      }
  
      ticketData.amount = totalAmount;
  
      const user = await userModel
        .findById(cart.purchaser)
        .select('email');
  
      ticketData.purchaser = user.email;
  
      const newTicket = await ticketModel.create(ticketData);
      console.log('Ticket generado:', newTicket);
      return newTicket;
    } catch (error) {
      console.error('Error al generar el ticket:', error);
      throw error;
    }
  };