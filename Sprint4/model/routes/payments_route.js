
const express = require('express');
const router = express.Router();
//const users_model = require("../models/users_model.js")


// routes

const {payProduct} = require("../../controller/payments_controller.js") 
router.post('/payProduct', payProduct)

const {getProductPayments} = require("../../controller/payments_controller.js") 
router.post('/getProductPayments', getProductPayments)


module.exports = router;