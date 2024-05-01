import User from '../modules/user.js'
import createNotification from '../utils/notifcation.js';

//get all users
const getUsers = async (req,res,next) =>{
    try{
        const users = await User.find();
        res.json(users);
    }catch (err){
        next(err)
    }
}

// get single user
const getUser = async (req,res,next) =>{
    try{
        const {id} = req.params;
        const user = await User.findById(id)
        res.json(user);
    }catch(err){    
        next(err)
    }
}

// block user
const blockUser = async (req,res,next) =>{
    try{
        const {id} = req.params;
        const user = await User.findByIdAndUpdate(id,{
            blocked:true
        },{
            new:true
        })

        createNotification('Your account has been blocked by the administrator',user._id,'admin')

        res.json({success:true,message:"User blocked successfully"})
    }catch(err){
        next(err)
    }
}

// deblock user
const deBlockUser = async (req,res,next) =>{
    try{
        const {id} = req.params;
        const user = await User.findByIdAndUpdate(id,{
            blocked:false
        },{
            new:true
        })

        createNotification('Your account is finaly deblocked',user._id,'admin')

        res.json({success:true,message:"User deblocked successfully"})
    }catch(err){
        next(err)
    }
}


export default {getUsers,getUser,blockUser,deBlockUser}