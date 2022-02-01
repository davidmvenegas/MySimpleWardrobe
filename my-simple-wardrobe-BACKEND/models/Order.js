const mongoose = require("mongoose")

const OrderSchema = new mongoose.Schema({
    userId: {type: String, required: true},
    amount: {type: Number, required: true},
    address: {type: Object, required: true},
    name: {type: String, required: true},
    status: {type: String, default: "pending"},
    products: [
        {
            productID: {type: Object},
        }
    ],
}, {timestamps: true})

module.exports = mongoose.model("Order", OrderSchema)