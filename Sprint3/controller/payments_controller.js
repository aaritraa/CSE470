
const payments_model = require("../model/models/payments_model.js") 

// login


const payProduct = (req,res) => {
    //const { email, name, Address, phone, cardNum, cvc, price } = req.body
    payments_model.create(req.body)
        .then(res.json("Payment Successful"))
        .catch(err => res.json(err))
}

const getProductPayments = (req, res) => {
    const { userEmail } = req.body
    //console.log(userEmail)
    payments_model.find({email:userEmail})
        .then(payments => {
            //console.log(payments)
            res.json(payments)
        })
        .catch(err => res.json(err)) 
}



module.exports = {
    payProduct,
    getProductPayments
}