const mongoose = require('mongoose')

const messages_schema = new mongoose.Schema({
    fromEmail: String,
    fromName: String,
    toEmail: String,
    toName: String,
    content: String,
    timeStamp: {
        type: Date,
        default: Date.now 
    }
}, {
    collection: 'messages' 
}
)
const messages_model = mongoose.model("messages", messages_schema)
module.exports = messages_model