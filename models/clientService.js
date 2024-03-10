import  mongoose from 'mongoose'

var serviceSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true,
    },
    status:{
        type:String,
        enum:['pending','complete','canceled'],
        required:true,
        default:'pending'
    },
    reserved:[
        {
            user:{
                type:mongoose.Schema.Types.ObjectId,
                ref:"User"
            },
            status:{
                type:Boolean,
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
export default mongoose.model('Service', serviceSchema);