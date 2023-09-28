
// the connection has been made already in index.js ---> in this file we are just only require the mongoose.
const mongoose = require("mongoose");

// creating  a schema 
const chatSchema = new mongoose.Schema({
     from:{
        type: String,
        required: true
     },
     to: {
        type: String,
        required: true
     },
     msg:{
        type: String,
        maxLength: 50
     },
     created_at:{
        type: Date,
        required: true
     }
});


// creating a  model
const Chat = mongoose.model("Chat",chatSchema);


// exporting the Chat 
module.exports = Chat;