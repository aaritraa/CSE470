
const products_model = require("../model/models/products_model.js") 

// login

const getAllProducts = (req,res) => {
    products_model.find()
        .then(products => res.json(products))
        .catch(err => res.json(err))
}



module.exports = {
    getAllProducts
}