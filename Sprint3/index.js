const express = require("express")
//const express = require ("./node_modules/express")
const mongoose = require('mongoose')
const cors = require("cors")
const multer = require('multer')
const path = require('path')

const users_model = require("./model/models/users_model.js")
//const services_model = require("./model/models/services_model.js")
const posts_model = require("./model/models/posts_model.js")
const products_model = require("./model/models/products_model.js")
const payments_model = require("./model/models/payments_model.js")
const service_payments_model = require("./model/models/service_payments_model.js")

// middlewares
const app = express()
app.use(express.json())
app.use(cors())
app.use(express.static('model'))  // allow views to access model folder


/////routes   

//login, signup, getUserInfo, updateProfile(user)
const users_route = require('./model/routes/users_route.js')
app.use('/', users_route)


const services_route = require('./model/routes/services_route.js')
app.use('/', services_route)


const vet_route = require('./model/routes/vet_route.js')
app.use('/', vet_route)


const messages_route = require('./model/routes/messages_route.js')
app.use('/', messages_route)

const events_route = require('./model/routes/events_route.js')
app.use('/', events_route)


//getAllPosts, updateLikes, updateComments
const posts_route = require('./model/routes/posts_route.js')
app.use('/', posts_route)

//getAllProducts
const products_route = require('./model/routes/products_route.js')
app.use('/', products_route)

//payProduct, getProductPayments
const payments_route = require('./model/routes/payments_route.js')
app.use('/', payments_route)

//getServicePayments, payService
const service_payments_route = require('./model/routes/service_payments_route.js')
app.use('/', service_payments_route)



// image storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'model/Images')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname))
    }
})
const upload = multer({
    storage: storage
})

// upload post
app.post('/upload', upload.single('file'), (req, res) => {  // uploading post image
    //console.log(req.file) 
    //posts_model.create({ image: req.file.filename, caption: req.caption })
    posts_model.create({ image: req.file.filename})
        .then(result => res.json(result))
        .catch(err => console.log(err))
})
app.post('/uploadPost', (req, res) => {   // uploading post data
    const { post_id, caption, radio, userName } = req.body
    //console.log(post_id)
    //console.log(caption)
    //console.log(radio)
    posts_model.findOneAndUpdate({ _id: post_id }, { caption: caption, type: radio, userName: userName })
        .then(res.json("Uploaded Post"))
        .catch(err => res.json(err))
})


// upload product
app.post('/uploadProductImage', upload.single('file'), (req, res) => {  // uploading product image
    //console.log(req.file) 
    //posts_model.create({ image: req.file.filename, caption: req.caption })
    products_model.create({ image: req.file.filename})
    .then((result) => {
        console.log(result)
        res.json(result)
    })
    .catch(err => console.log(err))
})
app.post('/uploadProduct', (req, res) => {   // uploading product data
    console.log('in')
    const { post_id, title, description, price } = req.body
    console.log(post_id)
    //console.log(caption)
    //console.log(radio)
    products_model.findOneAndUpdate({ _id: post_id }, { title:title, description:description, price:price })
    .then(res.json("Uploaded Product"))
    .catch(err => res.json(err))
})





//getAllPosts
//app.get('/getAllPosts', (req, res) => {
//    posts_model.find()
//        .then(posts => res.json(posts))
//        .catch(err => res.json(err))
//})

// update likes
//app.post('/updateLikes', (req, res) => {
//    //const post_id = req.params.id;
//    const { post_id, newLikes } = req.body
//    posts_model.findOneAndUpdate({ _id: post_id }, { likes: newLikes })
//        .then(res.json("Updated Likes"))
//        .catch(err => res.json(err))
//})

// update comments
//app.post('/updateComments', (req, res) => {
//    //console.log('in')
//    //const post_id = req.params.id;
//    const { post_id, userName, newComment } = req.body
//    console.log(userName)

//    const commentArray = [userName, newComment]
//    posts_model.findByIdAndUpdate({_id: post_id}, {$push:{comments:commentArray} }, { new: true })
//        .then((res) => {
//            res.json(res)
//            console.log(post_id)
//            console.log(res.data)
//        })
//        .catch(err => res.json(err))
//})


// getting list of all products
//app.get('/getAllProducts', (req, res) => {
//    products_model.find()
//        .then(products => res.json(products))
//        .catch(err => res.json(err))
//})

// make product payment
//app.post('/payProduct', (req, res) => {
//    //const { email, name, Address, phone, cardNum, cvc, price } = req.body
//    payments_model.create(req.body)
//        .then(res.json("Payment Successful"))
//        .catch(err => res.json(err))
//})

// get all product payments for user
//app.post('/getProductPayments', (req, res) => {
//    const { userEmail } = req.body
//    //console.log(userEmail)
//    payments_model.find({email:userEmail})
//        .then(payments => {
//            //console.log(payments)
//            res.json(payments)
//        })
//        .catch(err => res.json(err)) 
//})

// get all service payments for user
//app.post('/getServicePayments', (req, res) => {
//    const { userEmail } = req.body
//    //console.log(userEmail)
//    service_payments_model.find({email:userEmail})
//        .then(payments => {
//            //console.log(payments)
//            res.json(payments)
//        })
//        .catch(err => res.json(err)) 
//})



// make service payment
//app.post('/payService', (req, res) => {
//    //const { email, name, Address, phone, cardNum, cvc, price } = req.body
//    service_payments_model.create(req.body)
//        .then(res.json("Payment Successful"))
//        .catch(err => res.json(err))
//})

// getting user info
//app.post('/getUserInfo', (req, res) => {
//    const { userEmail } = req.body
//    //const userEmail = req.params.userEmail
//    //console.log("userEmail=",userEmail)
//    users_model.findOne({email:userEmail})
//        .then(user => res.json(user))
//        .catch(err => res.json(err)) 
//})

// update profile
//app.post('/updateProfile', (req, res) => {
//    const { userEmail,firstName,lastName,address,bio } = req.body
//    users_model.findOneAndUpdate({ email:userEmail }, { firstName:firstName, lastName:lastName, address:address, bio:bio })
//    .then((user) => res.json(user))
//    .catch(err => res.json(err))
//})

//app.post('/login', (req, res) => {
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

//app.post('/signup', (req, res) => {
//    const email = req.body.email;

//    users_model.find({ email: email })
//        .then((users) => {
//            //console.log(users)
//            if (users.length == 0) {
//                users_model.create(req.body) // uploading body given by client to DB
//                    .then((login_info_users) => res.json(login_info_users))  // responding back the uploaded body to client
//                    .catch(err => res.json(err))
//            } else {
//                console.log("Email already exists")
//                res.json("Email already exists")
//            }
//        })
//})





mongoose.connect("mongodb+srv://admin_pet_connect:admin_pet_connect@database-api.sassvmz.mongodb.net/Pet_Connect_DB?retryWrites=true&w=majority")
    .then(() => {
        console.log("connected to MongoDB")
    })
    .catch((error) => {
        console.log(error)
    })

app.listen(5000, () => {
    console.log("server is running")
}) 