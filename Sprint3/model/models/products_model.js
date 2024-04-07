const mongoose = require('mongoose')

const products_schema = new mongoose.Schema({
    image: String,
    title: String,
    description: String,
    price: String,
    //role: { type: String, default: "normal" }
}, {
    collection: 'products' // preventing auto add 's' in mongodb table 
}
)

const products_model = mongoose.model("products", products_schema)
module.exports = products_model