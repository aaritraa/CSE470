
const express = require('express');
const router = express.Router();
//const users_model = require("../models/users_model.js")


// routes

const { getAllProducts } = require("../../controller/products_controller.js")
router.get('/getAllProducts', getAllProducts)



module.exports = router;