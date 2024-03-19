import mongoose from 'mongoose'

var notificationSchema = new mongoose.Schema({
    message:{
        type:String,
        required:true
    },
    checked:{
        type:Boolean,
        required:true,
        default:false,
    }
},{
    timestamps:string
});

export default mongoose.model('Notification', notificationSchema);