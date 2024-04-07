const mongoose = require('mongoose')

const services_schema = new mongoose.Schema({
    title: String,
    providerEmail: String,
    providerName: String,
    type: String,
    description: String,
    rate: Number
}, {
    collection: 'services'  
}
)

const services_model = mongoose.model("services", services_schema)
module.exports = services_model