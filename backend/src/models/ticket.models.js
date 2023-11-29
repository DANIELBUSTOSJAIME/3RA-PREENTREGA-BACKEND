import { Schema, model } from "mongoose";

const ticketSchema = new Schema({
    code: {
        type: String,
        required: true,
        unique: true
    },
    purchase_datetime: {
        type: Date,
        default: Date.now
    },
    purchaser: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
});

export const ticketModel = model('ticket', ticketSchema);