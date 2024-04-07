const express = require('express');
const router = express.Router();




const {sendMessage} = require("../../controller/messages_controller.js") 
router.post('/sendMessage', sendMessage);

const {getSenders} = require("../../controller/messages_controller.js") 
router.get('/getSenders/:email', getSenders);


const {getMessages} = require("../../controller/messages_controller.js") 
router.get('/getMessages/:userEmail/:selectedSender', getMessages);

module.exports = router;
