const mongoose = require('mongoose')

const service_payments_schema = new mongoose.Schema({
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
    collection: 'service_payments' // preventing auto add 's' in mongodb table 
}
)

const service_payments_model = mongoose.model("service_payments", service_payments_schema)
module.exports = service_payments_model