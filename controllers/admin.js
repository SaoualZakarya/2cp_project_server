import User from '../models/user.js'
import Notification from '../models/notification.js';

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

        const notification = await Notification.create({
            message : 'Your account has been blocked by the administrator',
            user : user._id
        })

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

        const notification = await Notification.create({
            message : 'Your account is finaly deblocked',
            user : user._id
        })

        res.json({success:true,message:"User deblocked successfully"})
    }catch(err){
        next(err)
    }
}


export default {getUsers,getUser,blockUser,deBlockUser}