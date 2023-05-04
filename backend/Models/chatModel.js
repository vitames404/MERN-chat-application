// The chat model contains

// chatName
// isGroupChat
// users
// latestMessage
// groupAdmin

const mongoose = require('mongoose')

// Define chat model
const chatModel = mongoose.Schema({

    chatName:{type:String,trim:true},
    isGroupChat:{type:Boolean, default:false},
    users:[
        {
            // Schemas details are more clear in the mongoose documentation

            type:mongoose.Schema.Types.ObjectId,
            ref:"User",

        }
    ],
    latestMessage:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Message",
    },
    groupAdmin:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User", 
    },
},

    {
        timestamps: true,
    }

);

const Chat = mongoose.Model("Chat", chatModel);

module.exports = Chat;