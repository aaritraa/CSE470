const express = require('express');
const router = express.Router();

const {showServices} = require("../../controller/services_controller.js") 
router.get('/showServices', showServices);


const {addToCart} = require("../../controller/services_controller.js")
router.post('/add-to-cart', addToCart);

module.exports = router;