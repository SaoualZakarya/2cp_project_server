import express from 'express'
import user from '../controllers/user.js'
import {authMiddleware,isBlocked,isFreelencer, isVerified} from '../middlewares/authMiddleware.js'

const userRouter = express.Router()

// upload profile picture
// userRouter.

// send verification email
userRouter.post('/send-verification-email',authMiddleware,isBlocked, user.sendVerificationEmail);
// verify account 
userRouter.get('/verify/:token',authMiddleware,isBlocked, user.verifyUser)

// add more user informations
userRouter.post('/update-profile',authMiddleware,isBlocked,isVerified,user.updateProfile)


export default userRouter ;