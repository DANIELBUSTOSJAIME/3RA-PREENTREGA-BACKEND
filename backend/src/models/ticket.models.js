import { Schema, model } from "mongoose";
import { v1 as uuidv1 } from 'uuid';
import { userModel } from "./user.models.js";
import { cartModel } from "./cart.models.js";

const ticketSchema = new Schema({
    code: {
        type: String,
        default: uuidv1(),
        unique: true
    }, 
    purchase_datatime: {
        type: Date,
        default: Date.now
    }

});

ticketSchema.pre('save', async function(next) {
    try {
      const cart = await cartModel.findById(this.cart).populate('products.id_prod');
      let totalAmount = 0;
      for (const product of cart.products) {
        totalAmount += product.quantity * product.id_prod.price;
      }
      this.amount = totalAmount;
      
      const user = await userModel.findById(cart.purchaser).select('email');
      this.purchaser = user.email;
      
      next();
    } catch (error) {
      next(error);
    }
});

export const ticketModel = model('ticket', ticketSchema);