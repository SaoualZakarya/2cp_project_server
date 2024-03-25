import express from 'express'
import freelencer from '../controllers/freelencer.js'
import {authMiddleware,isBlocked,isVerified,isFreelencer} from '../middlewares/authMiddleware.js'
import { uploadPhoto } from '../middlewares/uploadImage.js'
import { uploadImages } from '../controllers/upload.js'
const router = express.Router()

// upload certificate photo
router.post('/certificate/upload',authMiddleware,isBlocked,isVerified,isFreelencer,uploadPhoto.array('images',10),uploadImages)
// create freelencer
router.post('/create',authMiddleware,isBlocked,isVerified,freelencer.createFreelencer)
// update freelencer
router.put('/update',authMiddleware,isBlocked,isVerified,isFreelencer,freelencer.updateFreelencer)
// get freelencer
router.get('/get',authMiddleware,isBlocked,isVerified,isFreelencer,freelencer.getFreelencer)
// apply for project
router.put('/apply/:id',authMiddleware,isBlocked,isVerified,isFreelencer,freelencer.applyProject)
// switch role into user 
router.put('/user',authMiddleware,isBlocked,isVerified,isFreelencer,freelencer.switchIntoUser)
export default router ;