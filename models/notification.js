import mongoose from 'mongoose';

const notificationSchema = new mongoose.Schema({
    message: {
        type: String,
        required: true
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
        enum:['auth','project','service','enquiry','chat'],
        default:'auth'
    }
}, {
    timestamps: true 
});

export default mongoose.model('Notification', notificationSchema);
