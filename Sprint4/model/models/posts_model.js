const mongoose = require('mongoose')

const posts_schema = new mongoose.Schema({
    image: String,
    caption: String,
    type: String,
    userName: String,
    likes: {type: Number, default: 0},
    comments: {type: Array, default: []}
    //role: { type: String, default: "normal" }
}, {
    collection: 'posts' // preventing auto add 's' in mongodb table 
}
)

const posts_model = mongoose.model("posts", posts_schema)
module.exports = posts_model