import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
    },
    comment:{
        type:String,
        required:true
    },
    status:{
        type:String,
        default:"In progress",
        enum:["In progress","Contacted"]
    }
},{
    timestamps:true
});

//Export the model
export default mongoose.model('Enquiry', userSchema);