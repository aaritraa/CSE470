
const express = require('express');
const router = express.Router();
//const users_model = require("../models/users_model.js")


// routes

const {find_user} = require("../../controller/users_controller.js") 
router.post('/login', find_user)

const {signup} = require("../../controller/users_controller.js") 
router.post('/signup', signup)

const {getUserInfo} = require("../../controller/users_controller.js") 
router.post('/getUserInfo', getUserInfo)

const {updateProfile} = require("../../controller/users_controller.js") 
router.post('/updateProfile', updateProfile)


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