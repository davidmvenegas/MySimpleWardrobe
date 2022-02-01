const mongoose = require("mongoose")

const ReviewSchema = new mongoose.Schema({
    productId: {type: String, required: true, unique: true},
    reviews: {type: Array},
}, {timestamps: true})

module.exports = mongoose.model("Review", ReviewSchema)