
const users_model = require("../model/models/users_model.js") 

// login
const find_user = (req, res) => {
    const { email, password } = req.body;  // storing json body elements to variables which is sent by client 
    console.log(req.body)
    users_model.findOne({ email: email })  // find user based on email
        .then((user) => {  // 'user' is the response about finding email, can name anything 
            if (user) {
                if (user.password === password) { 
                    //console.log(user["firstName"]+user["lastName"])
                    res.json([user["firstName"]+" "+user["lastName"], user]) 
                } else {
                    res.json(["The password is incorrect", ""])
                }
            } else {
                res.json(["User not found", ""])
            }
        })
}


//signup
const signup = (req, res) => {
    const email = req.body.email;

    users_model.find({ email: email })
        .then((users) => {
            //console.log(users)
            if (users.length == 0) {
                users_model.create(req.body) // uploading body given by client to DB
                    .then((user) => {
                        res.json([user["firstName"]+" "+user["lastName"], user]) 
                        //res.json(user)
                    })  // responding back the uploaded body to client
                    .catch(err => res.json(err))
            } else {
                console.log(["Email already exists",""])
                res.json(["Email already exists",""])
            }
        })
}

const getUserInfo = (req,res) =>{
    const { userEmail } = req.body
    //const userEmail = req.params.userEmail
    //console.log("userEmail=",userEmail)
    users_model.findOne({email:userEmail})
        .then(user => res.json(user))
        .catch(err => res.json(err)) 
}

const updateProfile = (req,res) => {
    const { userEmail,firstName,lastName,address,bio } = req.body
    users_model.findOneAndUpdate({ email:userEmail }, { firstName:firstName, lastName:lastName, address:address, bio:bio })
    .then((user) => res.json(user))
    .catch(err => res.json(err))
}



module.exports = {
    find_user,
    signup,
    getUserInfo,
    updateProfile
}