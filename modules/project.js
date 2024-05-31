import mongoose from 'mongoose'

var projectSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true,
    },
    skills:[{
        type:String,
    }],
    amount:{
        type:Number,
        required:true
    },
    status:{
        type:String,
        enum:['pending','complete','canceled','fullfield'],
        default:'pending'
    },
    user :{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    reserved:[
        {
            user:{
                type:mongoose.Schema.Types.ObjectId,
                ref:"User"
            },
            status:{
                type:String,
                default:'pending',
                enum:['pending','refused']
            }
        }
    ],
    payed:{
        type:Boolean,
        default:false
    },
    reservedCount:{
        type:Number,
        default:0
    },
    acceptedFreelencer :{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
    },
    projectSubmission:{
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
},{
    timestamps:true
});

// Export the model
export default mongoose.model('Project', projectSchema);