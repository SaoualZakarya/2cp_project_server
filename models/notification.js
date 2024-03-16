import mongoose from 'mongoose'

var userSchema = new mongoose.Schema({
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

export default mongoose.model('Notification', userSchema);