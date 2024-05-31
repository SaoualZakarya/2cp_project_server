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
                enum:['canceled','accepted','pending','done']
            },
            serviceSubmission:{
                link:{
                    type:String
                },
                desc:{
                    type:String
                },
                done:{
                    type:Boolean,
                    default:false
                }
            }
        }
    ],
    numEnroled:{
        type: Number,
        default: 0
    },
    freelancer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    timestamps: true
});

export default mongoose.model('Service', serviceSchema);
