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
        type: Schema.Types.String,
        ref: "users"
    },
    amount: {
        type: Number,
        required: true
    },
});

ticketSchema.pre("findOne", function () {
    this.populate("users.email")
})

export const ticketModel = model('ticket', ticketSchema);