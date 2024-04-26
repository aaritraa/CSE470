const express = require('express');
const router = express.Router();
//const users_model = require("../models/users_model.js")


// routes

const {getAllPosts} = require("../../controller/posts_controller.js") 
router.get('/getAllPosts', getAllPosts)

const {updateLikes} = require("../../controller/posts_controller.js") 
router.post('/updateLikes', updateLikes)

const {updateComments} = require("../../controller/posts_controller.js") 
router.post('/updateComments', updateComments)



module.exports = router;