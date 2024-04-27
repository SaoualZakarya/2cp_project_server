import Enquiry from '../models/enquiry.js'
import validateMongoDbId from '../utils/validate_mongodb_id.js';



// create Enquiry
const createEnquiry = async (req,res,next)=>{
    const {comment} = req.body
    const email = req.user.email

    const validCharacters = /^[a-zA-Z0-9\s.,!?]+$/;

    try{

        if (!validCharacters.test(comment)) {   
            return res.status(400).json({ success: false, message: "Invalid characters in the comment" });
        }

        const newEnquiry = await Enquiry.create({
            comment,
            email
        })
        res.json({success:true, message:"Enquiry created succefully"})
    }catch(err) {
        next(err)
    }
}

// update Enquiry status 
const updateEnquiry = async (req,res,next)=>{
    const {id} = req.params
    const {status} = req.body

    
    const statusList = ["In progress", "Contacted"]
    
    try{
        validateMongoDbId(id)
        if (!statusList.includes(status)) {
            return res.status(400).json({ success: false, message: "Invalid status value" });
        }
        const updateEnquiry = await Enquiry.findByIdAndUpdate(id,{
            status
        },{new:true})

        res.json({success:true, message:"Enquiry status updated succefully"})
    }catch(err) {
        next(err)
    }
}

//delete Enquiry
const deleteEnquiry = async (req,res,next)=>{
    const {id} = req.params

    try{
        validateMongoDbId(id)
        const deleteEnquiry = await Enquiry.findByIdAndDelete(id)
        res.json(deleteEnquiry)
    }catch(err) {
        next(err)
    }
}

// get Enquiry
const getEnquiry = async (req,res,next)=>{
    const {id} = req.params

    try{
        validateMongoDbId(id)
        const getEnquiry = await Enquiry.findById(id)
        res.json(getEnquiry)
    }catch(err) {
        next(err)
    }
}

// get all Enquiry
const getAllEnquiry = async (req,res,err)=>{
    try{
        const getAllEnquiry = await Enquiry.find()
        res.json(getAllEnquiry)
    }catch(err) {
        next(err)
    }
}

export default {
    getAllEnquiry,getEnquiry,deleteEnquiry,updateEnquiry,createEnquiry
}
