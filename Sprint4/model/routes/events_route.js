const express = require('express');
const router = express.Router();

// const {showServices} = require("../../controller/services_controller.js") 
// router.get('/showServices', showServices);


// const {addToCart} = require("../../controller/services_controller.js")
// router.post('/add-to-cart', addToCart);

const {getAllEvents} = require("../../controller/events_controller.js")
router.get('/getAllEvents', getAllEvents);

// POST indicate interest in an event
const {indicateInterest} = require("../../controller/events_controller.js")
router.post('/:id/interest', indicateInterest);

// POST indicate disinterest in an event
const {indicateDisinterest} = require("../../controller/events_controller.js")
router.post('/:id/disinterest', indicateDisinterest);

module.exports = router;