import User from '../modules/user.js'

// get user profile
const getUser = async (req,res,next) =>{
    const {id } = req.params ;
    try {        
        const user = await User.findById(id)
        .select('-password -googleId -stripeAccountId -passwordChangedAt -tokenExpiration -verificationToken -passwordResetToken -passwordResetExpires')
        if (!user) {
            return res.status(404).json({message:'User not found'})
        }
        res.status(200).json(user)

    } catch (error) {
        next(error)
    }
}

export default {getUser}