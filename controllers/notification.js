import Notification from '../models/notification.js'
import validateMongoDbId from '../utils/validate_mongodb_id.js';


// get all notification
const getAllNotification = async (req,res,err)=>{
    const userId = req.user._id
    try{
        const notifications = await Notification.find({user:userId})
        res.json({succes:true, data:notifications})
    }catch(err) {
        next(err)
    }
}

// check notification

const checkNotification = async (req,res,err)=>{
    const id = req.params.id
    const userId = req.user._id
    try{
        validateMongoDbId(id)
        const noticationCheck = await Notification.findByIdAndUpdate({
            user:userId,
            _id:id
        },{
            checked:true
        },{
            new:true
        })
        res.json({succes:true, message:'Notification checked successfully'})
    }catch(err) {
        next(err)
    }
}


export default {
    getAllNotification,checkNotification
}
