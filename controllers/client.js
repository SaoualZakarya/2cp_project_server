import Project from '../models/project.js'
import User from '../models/user.js'
import Service from '../models/freelencerService.js'

// const getClient = async (req,res,next) => {
//     const {id} = req.params
//     try {
//         const client = await User.findById(id)   
//         res.json(client)     
//     } catch (error) {
//         next(error)
//     }
// }

const createProject = async (req,res,next) =>{
    try {
        const {title,amount,description} = req.body
        const project = await Project.create({
            title,amount,description,user: req.user._id
        })
        res.json({success:true,data:project,message:"Project created successfully"})
    } catch (error) {
        next(err)
    }
} 

const updateProject = async (req,res,next) =>{
    const {id} = req.params
    try {
        const {title,amount,description} = req.body
        const project = await Project.findByIdAndUpdate(id,{
            title,amount,description
        },{new:true})
        res.json({success:true,data:project,message:"Project updated successfully"})
    } catch (error) {
        next(err)
    }
} 

const getUserProjects = async (req,res,next) =>{
    try {
        const userProjects = await Project.find({user:req.user._id})
        res.json(userProjects)
    } catch (error) {
        next(error);
    }
    
}

const getSingleUserProject = async (req, res, next) => {
    // Represent the project id
    const { id } = req.params;
    const userId = req.user._id;

    try {
        const userProject = await Project.findOne({ _id: id, user: userId })
            .populate('reserved.user');

        if (userProject) {
            res.json(userProject);
        } else {
            res.status(404).json({ message: "Project not found", success: false });
        }
    } catch (error) {
        next(error);
    }
}


const deleteSingleUserProject = async (req, res, next) => {
    // Represent the project id
    const { id } = req.params;
    const userId = req.user._id;

    try {
        const userProject = await Project.findOneAndDelete({ _id: id, user: userId });

        if (!userProject) {
            return res.status(404).json({ message: "Project not found", success: false });
        }

        res.json({ message: "Project deleted successfully", success: true, data: userProject });
    } catch (error) {
        next(error);
    }
}


const updateProjectStatus = async (req, res, next) => {
    const { status } = req.body;

    const acceptedStatuses = ['pending', 'complete', 'canceled', 'fullfield'];

    if (!acceptedStatuses.includes(status)) {
        return res.status(400).json({ success: false, message: "Invalid status supplied" });
    }

    try {
        let updatedProject = await Project.findByIdAndUpdate(id, { status }, { new: true });
        res.json({ message: "Project updated successfully", success: true });
    } catch (error) {
        next(error);
    }
}


const acceptFreelancerInProject = async (req, res, next) => {
    const projectId = req.params.id;
    const userId = req.body.userId;
    try {
        let updatedProject = await Project.findOneAndUpdate(
            { 
                _id: projectId, 
                "reserved.user": userId // Match the project ID and user ID in the reserved array
            },
            { 
                $set: { "acceptedFreelencer": userId }
            },
            { new: true }
        );

        if (!updatedProject) {
            return res.status(404).json({ message: "Project or user not found", success: false });
        }
        res.json({ message: "Freelancer accepted successfully in the project", success: true });
    } catch (error) {
        next(error);
    }
};


const canceledFreelancerInProject = async (req, res, next) => {
    const projectId = req.params.id;
    const userId = req.body.userId;
    try {
        let updatedProject = await Project.findOneAndUpdate(
            { 
                _id: projectId, 
                "reserved.user": userId // Match the project ID and user ID in the reserved array
            },
            { 
                $set: { "reserved.$.status": "refused" } // Update the status of the matched user
            },
            { new: true }
        );

        if (!updatedProject) {
            return res.status(404).json({ message: "Project or user not found", success: false });
        }
        res.json({ message: "Freelancer canceled successfully from the project", success: true });
    } catch (error) {
        next(error);
    }
};

const switchIntoFreelencer = async (req,res,next) => {
    const id = req.user._id
    try {
          // Delete all projects associated with the user
          await Project.deleteMany({ user: id });

          const user = await User.findByIdAndUpdate(id, { role: "freelancer" }, { new: true });
        res.json({success:true,data:user,message:"You are now freelancer"})
    } catch (error) {
        next(error)
    }
}

const getServices = async (req, res, next) => {
    // with this search paramas you can get using search , amount ...
    const { searchParam, minPrice, maxPrice } = req.query;
    const filters = {  };

    // allow to check for the search paramas within the service
    if (searchParam) {
        filters.service = { $regex: `.*${searchParam}.*`, $options: 'i' }; 
    }

    if (minAmount && !isNaN(minAmount)) {
        filters.price = { $gte: Number(minPrice) };
    }

    if (maxAmount && !isNaN(maxAmount)) {
        filters.price = { ...filters.amount, $lte: Number(maxPrice) };
    }

    try {
        const services = await Service.find(filters);
        res.json({ success: true, services });
    } catch (error) {
        next(error);
    }
};

export default {
    createProject,getUserProjects,getSingleUserProject,
    updateProject,deleteSingleUserProject,
    updateProjectStatus,
    acceptFreelancerInProject,canceledFreelancerInProject,
    switchIntoFreelencer,getServices
}