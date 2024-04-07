const mongoose = require('mongoose')

const payments_schema = new mongoose.Schema({
    title: String,
    email: String,
    name: String,
    address: String,
    phone: String,
    cardNum: String,
    cvc: String,
    price: String
    //role: { type: String, default: "normal" }
}, {
    collection: 'payments' // preventing auto add 's' in mongodb table 
}
)

const payments_model = mongoose.model("payments", payments_schema)
module.exports = payments_model