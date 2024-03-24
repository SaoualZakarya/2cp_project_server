import Project from '../models/project.js'
import User from '../models/user.js'


const getClient = async (req,res,next) => {
    const {id} = req.params
    try {
        const client = await User.findById(id)   
        res.json(client)     
    } catch (error) {
        next(error)
    }
}
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

const getSingleUserProject = async (req,res,next) =>{
    //represent the project id
    const {id} = req.params
    try {
        const userProject = await Project.findById(id).populate('reserved')
        res.json(userProject)
    } catch (error) {
        next(error);
    }
    
}

const deleteSingleUserProject = async (req,res,next) =>{
    //represent the project id
    const {id} = req.params
    try {
        const userProject = await Project.findByIdAndDelete(id)
        res.json({message:"project deleted successfully",success:true,data:userProject})
    } catch (error) {
        next(error);
    }
    
}

const updateProjectStatus = async (req,res,next) =>{
    const {status} = req.body
    const {id} = req.params
    try {
        let updatedProject = await Project.findByIdAndUpdate(id,
            {status},{new:true})
        res.json({message:"project updated successfully",success:true})
    }catch (error) {
        next(error)
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
                $set: { "reserved.$.status": "accepted" } // Update the status of the matched user
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
        res.json({ message: "Freelancer accepted successfully in the project", success: true });
    } catch (error) {
        next(error);
    }
};

export default {
    createProject,getUserProjects,getSingleUserProject,
    updateProject,deleteSingleUserProject,
    updateProjectStatus,getClient,
    acceptFreelancerInProject,canceledFreelancerInProject
}