const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema({
    sender:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    recipient : {
        type:mongoose.Schema.Types.ObjectId,
        ref :"User",
        required : true
    },
    content:{
        title:{
            type:String,
            required:true   
        },
        description:{
            type:String,
            required:true
        },
        isSent:{
            type:Boolean,
            default:false
        }
    }
},{timestamps:true});