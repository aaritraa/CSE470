
const products_model = require("../model/models/products_model.js") 

// login

const getAllProducts = (req,res) => {
    //console.log("getAllProducts, req.body= ", req.body)
    products_model.find()
        .then(products => {
            //console.log("res.json= ", products)
            res.json(products) 
        })
        .catch(err => res.json(err))
}


module.exports = {
    getAllProducts
}