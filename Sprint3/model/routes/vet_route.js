const express = require('express');
const router = express.Router();
//const users_model = require("../models/users_model.js")


// routes

const {getVetProfile} = require("../../controller/vet_profile_controller.js") 
router.get('/getVetProfile/:email', getVetProfile)

const {getServicesByVetEmail} = require("../../controller/vet_profile_controller.js") 
router.get('/getServicesByVetEmail/:email', getServicesByVetEmail)


const {updateVetProfile} = require("../../controller/vet_profile_controller.js")
router.put('/updateVetProfile/:id', updateVetProfile);

const {vetLogin} = require("../../controller/vet_profile_controller.js")
router.post('/vetLogin', vetLogin);

const {addService} = require("../../controller/vet_profile_controller.js")
router.post('/addService', addService);


//router.post('/login', (req, res) => {
//    const { email, password } = req.body;  // storing json body elements to variables which is sent by client 
//    console.log(req.body)
//    users_model.findOne({ email: email })  // find user based on email
//        .then((user) => {  // 'user' is the response about finding email, can name anything 
//            if (user) {
//                if (user.password === password) {
//                    res.json("Success")
//                } else {
//                    res.json("The password is incorrect")
//                }
//            } else {
//                res.json("User not found")
//            }
//        })
//})


module.exports = router;