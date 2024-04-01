import mongoose from 'mongoose';

const serviceSchema = new mongoose.Schema({
    service: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    enroledUsers: [
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User'
            },
            isPaid: {
                type: Boolean,
                default: false
            },
            status:{
                type:String,
                default:'pending',
                enum:['canceled','done']
            }
        }
    ],
    freelancer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Freelancer'
    }
}, {
    timestamps: true
});

export default mongoose.model('Service', serviceSchema);
