import User from '../models/user.js'

// update user profile
const updateProfile = async (req,res,next) => {
    const {photo,description,mobile} = req.body  
    try{
        const userId = req.user._id
        const updatedUser = await User.findByIdAndUpdate(userId,{
            photo,description,mobile
        },{
            new:true
        })
        res.json({success:true,message:"User updated successfully"})
    }catch(err){
        next(err)
    }
}



export {updateProfile}