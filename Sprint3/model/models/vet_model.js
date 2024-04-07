const mongoose = require('mongoose')

const vet_schema = new mongoose.Schema({
    email: String,
    name: String,
    qualification: String,
    workplace: String,
    password: String
}, {
    collection: 'vet' 
}
)

const vet_model = mongoose.model("vet", vet_schema)
module.exports = vet_model