
const service_payments_model = require("../model/models/service_payments_model.js") 

// login


const getServicePayments = (req,res) => {
    const { userEmail } = req.body
    //console.log(userEmail)
    service_payments_model.find({email:userEmail})
        .then(payments => {
            //console.log(payments)
            res.json(payments)
        })
        .catch(err => res.json(err)) 
}

const payService  = (req,res) => {
    //const { email, name, Address, phone, cardNum, cvc, price } = req.body
    service_payments_model.create(req.body)
    .then(res.json("Payment Successful"))
    .catch(err => res.json(err))
}




module.exports = {
    getServicePayments,
    payService
}