import express from 'express'
import user from '../controllers/user.js'
import {authMiddleware,isBlocked, isVerified} from '../middlewares/authMiddleware.js'
import { resizeProfilePicture, uploadPhoto } from '../middlewares/uploadImage.js'
import { deleteImage, uploadImage } from '../controllers/upload.js'

const userRouter = express.Router()

// upload profile picture
userRouter.post('/profile-picture',authMiddleware,isBlocked,isVerified,uploadPhoto.single('image'),resizeProfilePicture,uploadImage)

// delete picture
userRouter.delete('/delete-image/:id',authMiddleware,isBlocked,isVerified,deleteImage)

// send verification email
userRouter.post('/send-verification-email',authMiddleware,isBlocked, user.sendVerificationEmail);
// verify account 
userRouter.get('/verify/:token',authMiddleware,isBlocked, user.verifyUser)

// add more user informations
userRouter.post('/update-profile',authMiddleware,isBlocked,isVerified,user.updateProfile)


export default userRouter ;