const mongoose = require('mongoose')

const events_schema = new mongoose.Schema({
    creatorEmail : String,
    creatorName : String,
    description : String,
    dateAndTime : String,
    interestCount : Number,
    uninterestedCount : Number,
    eventTitle : String

}, {
    collection: 'events'  
}
)

const events_model = mongoose.model("events", events_schema)
module.exports = events_model