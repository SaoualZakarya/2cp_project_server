import Project from '../models/project.js'
import User from '../models/user.js'
import Service from '../models/service.js'
import { cloudinaryRemoveImg } from '../utils/cloudinary.js'

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
        next(error)
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
        next(error)
    }
}

const getFreelencer = async (req, res, next) => {
    const id = req.user._id
    try {
        const freelencer = await User.findById(id)
        res.json({success:true,data:freelencer})
    } catch (error) {
        next(error)
    }
}

const applyProject = async (req, res, next) => {
    let projectId=req.params.id
    let userId=req.user._id
    try {
        const project = await Project.findById(projectId)
        if(project.status === "complete" || project.status === 'fullfield' || project.status === "canceled"){
            res.status(404).json({success:false,message:"Project or fullfield complete or canceled"})
        }
        await Project.findByIdAndUpdate(projectId, {
            $push: {
                reserved: {
                    user: userId
                }
            }
        }, {new: true})
        res.json({success:true,message:"Project applied successfully"})
    }catch(err){
        next(err)
    }
}

const getProjectsAccepted = async (req,res,next) => {
    const userId = req.user._id
    try {
        const projects = await Project.find({
            reserved: {
                $elemMatch: {
                    user: userId,
                    status: 'accepted'
                }
            }
        });
        res.json({success:true,projects})
    } catch (error) {
        next(error)
    }
}

const getProjectsCanceled = async (req,res,next) => {
    const userId = req.user._id
    try {
        const projects = await Project.find({
            reserved: {
                $elemMatch: {
                    user: userId,
                    status: 'refused'
                }
            }
        });
        res.json({success:true,projects})
    } catch (error) {
        next(error)
    }
}

const getProjectsExists = async (req, res, next) => {
    // with this search paramas you can get using search , amount ...
    const { searchParam, minAmount, maxAmount } = req.query;
    // we will get only the projects that are pending
    const filters = { status: 'pending' };

    // allow to check for the search paramas within the title
    if (searchParam) {
        filters.title = { $regex: `.*${searchParam}.*`, $options: 'i' }; 
    }

    if (minAmount && !isNaN(minAmount)) {
        filters.amount = { $gte: Number(minAmount) };
    }

    if (maxAmount && !isNaN(maxAmount)) {
        filters.amount = { ...filters.amount, $lte: Number(maxAmount) };
    }

    try {
        const projects = await Project.find(filters);
        res.json({ success: true, projects });
    } catch (error) {
        next(error);
    }
};

const switchIntoUser = async (req,res,next) => {
    const id = req.user._id
    try {
        // to delete the certificate that user already uploaded
        const userCeritificate = await User.findById(id).select('certificate')
        for (certificate of userCeritificate.certificate){
            await cloudinaryRemoveImg(certificate.asset_id)
        }
        const user = await User.findByIdAndUpdate(id,{
            role:"user",
            skills:[],
            education:'',
            certificate:[],
            experience:[]
        },{new:true})
        res.json({data:user,message:"You are now a user ",success:true})
    } catch (error) {
        next(error)
    }
}

const createService = async (req,res,next) => {
    const id = req.user._id
    const {service,description,price} = req.body
    try {
        const newService = await Service.create({
            service,
            description,
            price,
            freelancer:id,
        })
        res.json({success:true,data:newService,message:"Service created successfully"})
    } catch (error) {
        next(error)
    }
}

const updateService = async (req,res,next) => {
    const serviceId = req.params
    const {service,description,price} = req.body
    try {
        const updatedService = await Service.findByIdAndUpdate(serviceId,{
            service,
            description,
            price,
        },{new:true})
        res.json({success:true,data:updatedService,message:"Service updated successfully "})
    } catch (error) {
        next(error)
    }
}

const getService = async (req,res,next) => {
    const serviceId = req.params
    try {
        const theService = await Service.findById(serviceId)
        if(!theService){
            res.status(404).json({success:false,message:"Service not found"})
        }
        res.json({success:true,data:theService})
    } catch (error) {
        next(error)
    }
}

const deleteService = async (req,res,next) => {
    const serviceId = req.params
    try {
        const deletedService = await Service.findByIdAndDelete(serviceId)
        res.json({success:true,message:"Service deleted successfully "})
    } catch (error) {
        next(error)
    }
}

const getAllFreelencerServices =  async (req,res,next) => {
    const id = req.user._id
    try {
        const freelancerServices = await Service.find({freelancer:id})
        res.json({success:true,services: freelancerServices})
    } catch (error) {
        next(error)
    }
}

export default {
    createFreelencer,updateFreelencer,getFreelencer
    ,applyProject,switchIntoUser,createService,
    updateService,deleteService,
    getService,getAllFreelencerServices,
    getProjectsAccepted,getProjectsCanceled,
    getProjectsExists
}