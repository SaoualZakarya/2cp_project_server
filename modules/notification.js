import mongoose from 'mongoose';

const notificationSchema = new mongoose.Schema({
    message: {
        type: String,
        required: true
    },
    icon:{
        type:String
    },
    checked: {
        type: Boolean,
        required: true,
        default: false
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', 
        required: true
    },
    purpose:{
        type: String,
        enum:['auth','project','general','service','enquiry','chat','admin','payment'],
        default:'general'
    },
    link:{
        type:String,   
    }
}, {
    timestamps: true 
});

export default mongoose.model('Notification', notificationSchema);
