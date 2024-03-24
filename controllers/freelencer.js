import Project from '../models/project.js'
import User from '../models/user.js'

const createFreelencer = async (req,res,next) => {
    const id = req.user._id
    try {
        const {skills,experience,education,certificate} = req.body
        const freelencer = await User.findByIdAndUpdate(id,{
            role:"freelencer",
            skills,
            education,
            experience,
            certificate
        },{new:true})
        res.json({success:true,data:freelencer,message:"Freelencer created successfully"})
    } catch (error) {
        next(err)
    }
}


const updateFreelencer = async (req,res,next) => {
    const id = req.user._id
    try {
        const {skills,experience,education,certificate} = req.body
        const freelencer = await User.findByIdAndUpdate(id,{
            skills,
            education,
            experience,
            certificate
        },{new:true})
        res.json({success:true,data:freelencer,message:"Freelencer updated successfully"})
    } catch (error) {
        next(err)
    }
}

const getFreelencer = async (req, res, next) => {
    const id = req.user._id
    try {
        const freelencer = await User.findById(id)
        res.json({success:true,data:freelencer})
    } catch (error) {
        next(err)
    }
}

export default {
    createFreelencer,updateFreelencer,getFreelencer,
    
}