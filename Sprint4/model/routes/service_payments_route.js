
const express = require('express');
const router = express.Router();
//const users_model = require("../models/users_model.js")


// routes

const {getServicePayments} = require("../../controller/service_payments_controller.js") 
router.post('/getServicePayments', getServicePayments)

const {payService} = require("../../controller/service_payments_controller.js") 
router.post('/payService', payService)



module.exports = router;