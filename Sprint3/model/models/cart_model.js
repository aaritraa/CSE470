const mongoose = require('mongoose')

const cart_schema = new mongoose.Schema({
    email: String,
    userEmail: String,
    product : String,
    providerEmail : String,
    amount: Number,
    status: String
}, {
    collection: 'cart' 
}
)

const cart_model = mongoose.model("cart", cart_schema)
module.exports = cart_model