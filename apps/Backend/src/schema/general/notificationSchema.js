import { Schema as _Schema, model } from 'mongoose';
const Schema = _Schema;
const NotificationSchema = new Schema({
    sender:{
        type:Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    recipient : {
        type:Schema.Types.ObjectId,
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

const Notification = model('Notification', NotificationSchema);

export default Notification;