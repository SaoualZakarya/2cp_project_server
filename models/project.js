import  mongoose from 'mongoose'

var projectSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true,
    },
    amount:{
        type:Number,
        required:true
    },
    status:{
        type:String,
        enum:['pending','complete','canceled','fullfield'],
        required:true,
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
                required:true,
                default:'Pending',
                enum:['pending','accepted','refused']
            }
        }
    ]
},{
    timestamps:true
});

//Export the model
export default mongoose.model('Project', projectSchema);