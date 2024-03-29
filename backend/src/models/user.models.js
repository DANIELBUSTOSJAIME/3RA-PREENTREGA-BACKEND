import { Schema, model } from "mongoose";
import paginate from "mongoose-paginate-v2";
import { cartModel } from "./cart.models.js";
import { da } from "@faker-js/faker";

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },    
    lastName: {
        type: String,
        required: true,
        index: true
    },
    age: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    }, 
    rol: {
        type: String,
        default: 'user'
    },
    premium: {
        type: Boolean,
        default: false
    },
    cart: {
        type: Schema.Types.ObjectId,
        ref: 'carts'
    },
    documents: {
        type: [
            {
                name: {
                    type: String,
                    required: true
                },
                reference: {
                    type: String,
                    required: true
                }
            }
        ],
        default: function() {
            return [];
        }
    },
    last_connection: {
        type: Date,
        default: Date.now
    }
})

userSchema.plugin(paginate)

userSchema.pre('save', async function(next){
    try{
        const newCart = await cartModel.create({})
        this.cart = newCart._id
    } catch(error){
        next(error)
    }
})

export const userModel = model('user', userSchema)