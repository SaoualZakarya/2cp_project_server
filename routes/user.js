import express from 'express'
import user from '../controllers/user.js'
import {authMiddleware,isBlocked,isFreelencer, isVerified} from '../middlewares/authMiddleware.js'

const userRouter = express.Router()

// upload profile picture
// userRouter.

// add more user informations
userRouter.post('/update-profile',authMiddleware,isBlocked,isVerified,user.updateProfile)




export default userRouter ;