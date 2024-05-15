import Project from '../modules/project.js'
import User from '../modules/user.js'
import Service from '../modules/freelencerService.js'
import { cloudinaryRemoveImg } from '../utils/cloudinary.js'
import createNotification from '../utils/notifcation.js'

const createFreelencer = async (req,res,next) => {
    const id = req.user._id
    try {
        const {skills,certificate} = req.body
        const freelencer = await User.findByIdAndUpdate(id,{
            role:"freelencer",
            skills,
            certificate
        },{new:true})
        res.json({success:true,message:"Freelencer created successfully"})
    } catch (error) {
        next(error)
    }
}

const updateFreelencer = async (req,res,next) => {
    const id = req.user._id
    try {
        const {skills,certificate} = req.body
        const freelencer = await User.findByIdAndUpdate(id,{
            skills,
            certificate
        },{new:true})
        res.json({success:true,message:"Freelencer updated successfully"})
    } catch (error) {
        next(error)
    }
}

const getFreelencer = async (req, res, next) => {
    const id = req.user._id
    try {
        const freelencer = await User.findById(id).select('portfolio_url description  skills certificate')
        res.json({success:true,data:freelencer})
    } catch (error) {
        next(error)
    }
}

const applyProject = async (req, res, next) => {
    let projectId = req.params.id
    let userId = req.user._id
    try {
        const project = await Project.findById(projectId)

        if (!project) {
            return res.status(400).json({success:false,message:"Project not found!"});
        }

        const isApplied = project.reserved.some(ele => ele.user.equals(userId));

        if (isApplied) {
            return res.status(400).json({ success: false, message: "You have already applied on this project" });
        }

        if(project.status === "complete" || project.status === 'fullfield' || project.status === "canceled"){
            res.status(404).json({success:false,message:"Project are fullfield , complete or canceled"})
        }

        await Project.findByIdAndUpdate(projectId, {
            $push: {
                reserved: {
                    user: userId
                }
            },
            $inc: { reservedCount: 1 }
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
            acceptedFreelencer:userId
        });
        res.json({success:true,projects})
    } catch (error) {
        next(error)
    }
}

const getSingleProject = async (req,res,next) => {
    const {id} = req.params
    try {
        const project = await Project.findById(id).select('-reserved -acceptedFreelencer').populate('user','firstName lastName email')
        res.json({success:true,project})
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
        }).select('_id title description status amount')
        .populate('user', '_id firstName lastName email');
        res.json({success:true,projects})
    } catch (error) {
        next(error)
    }
}

const getProjectsExists = async (req, res, next) => {
    // with this search paramas you can get using search , amount ...
    const { searchParam, minAmount, maxAmount } = req.query;
    const filters = { };

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
        let query = Project.find();
    
        // Apply filters only if they are defined
        if (Object.keys(filters).length > 0) {
            query = query.find(filters);
        }
    
        const projects = await query
        .populate('user', 'firstName lastName photo')
        .populate('acceptedFreelencer', 'firstName lastName')
        .select('-reserved').exec();

        res.json({ success: true, projects });
    } catch (error) {
        next(error);
    }
    
};

const switchIntoUser = async (req,res,next) => {
    const id = req.user._id
    try {
        // to delete the certificate that user already uploaded
        const userCeritificate = await User.findById(id)
        userCeritificate.certificate.forEach(async (certificate) => {
            await cloudinaryRemoveImg(certificate.asset_id);
        });
        const user = await User.findByIdAndUpdate(id,{
            role:"user",
            skills:[],
            education:'',
            certificate:[],
            experience:[]
        },{new:true})

        const notification = await Notification.create({
            message : ` You role has been switched successfully into client`,
            user : id,
            purpose:'general'
        })

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
            freelancer: id,
        })

        const selectedService = await Service.findById(newService._id).select('service description price');

        res.json({success:true,data:selectedService,message:"Service created successfully"})
    } catch (error) {
        next(error)
    }
}

const updateService = async (req,res,next) => {
    const {id} = req.params
    const {service,description,price} = req.body
    try {
        const updatedService = await Service.findByIdAndUpdate(id,{
            service,
            description,
            price,
        },{new:true})
        res.json({success:true,message:"Service updated successfully "})
    } catch (error) {
        next(error)
    }
}

const getService = async (req,res,next) => {
    const {id:serviceId} = req.params
    const id = req.user._id
    try {
        const theService = await Service.findOne({_id:serviceId,freelancer:id})
        .populate({
            path: 'enroledUsers',
            populate: { path: 'user', select: 'firstName lastName email' }
        })
        .select('-freelancer')
        if(!theService){
            res.status(404).json({success:false,message:"Service not found"})
        }
        res.json({success:true,data:theService})
    } catch (error) {
        next(error)
    }
}

const deleteService = async (req,res,next) => {
    const serviceId = req.params.id
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
        const freelancerServices = await Service.find({freelancer:id}).select('-freelancer -enroledUsers')
        res.json({success:true,services: freelancerServices})
    } catch (error) {
        next(error)
    }
}

const accepteUserOnService =  async (req,res,next) => {
    const userId = req.body.user;
    const serviceId = req.params.id
    const creatorId = req.user._id;
    try {

        const service = await Service.findOne({ _id: serviceId, freelancer: creatorId });

        if (!service) {
            return res.status(403).json({ message: "You are not authorized to perform this action", success: false });
        }
        
        let updatedService = await Service.findOneAndUpdate(
            { 
                _id: serviceId, 
                "enroledUsers.user": userId 
            },
            { 
                $set: { 
                    "enroledUsers.$.status": "accepted", 
                }
            },
            { new: true }
        );

        if (!updatedService) {
            return res.status(404).json({ message: "Service or user not found", success: false });
        }

        let  msg = ` Your application for the ${updatedService.service} has been accepted  `;
            
        createNotification(msg,userId,'service') ; 

        res.json({ message: "Client added successfully to you list of clients ", success: true });
    } catch (error) {
        next(error);
    }
}


const refuseUserFromService =  async (req,res,next) => {
    const userId = req.body.user;
    const serviceId = req.params.id
    const creatorId = req.user._id;
    try {

        const service = await Service.findOne({ _id: serviceId, freelancer: creatorId });

        if (!service) {
            return res.status(403).json({ message: "You are not authorized to perform this action", success: false });
        }
        
        let updatedService = await Service.findOneAndUpdate(
            { 
                _id: serviceId, 
                "enroledUsers.user": userId 
            },
            { 
                $set: { 
                    "enroledUsers.$.status": "canceled", 
                }
            },
            { new: true }
        );

        if (!updatedService) {
            return res.status(404).json({ message: "Service or user not found", success: false });
        }

        const msg = ` Your application for the ${updatedService.service} has been refused`;
            
        createNotification(msg,userId,'service') ;

        res.json({ message: "Client added successfully to you list of clients ", success: true });
    } catch (error) {
        next(error);
    }
}

export default {
    createFreelencer,updateFreelencer,getFreelencer
    ,applyProject,switchIntoUser,createService,
    updateService,deleteService,
    getService,getAllFreelencerServices,
    getProjectsAccepted,getProjectsCanceled,
    getProjectsExists,getSingleProject,
    accepteUserOnService,refuseUserFromService
}