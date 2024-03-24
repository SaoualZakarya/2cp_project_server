import express from 'express'
import freelencer from '../controllers/freelencer.js'
import {authMiddleware,isBlocked,isVerified,isFreelencer} from '../middlewares/authMiddleware.js'
import { uploadPhoto } from '../middlewares/uploadImage.js'
import { uploadImages } from '../controllers/upload.js'
const router = express.Router()

// upload certificate photo
router.post('/photo/upload',authMiddleware,isBlocked,isVerified,freelencer,uploadPhoto.array('images',10),uploadImages)
// create freelencer
router.create('/create',authMiddleware,isBlocked,isVerified,freelencer.createFreelencer)
// update freelencer
router.put('/update',authMiddleware,isBlocked,isVerified,isFreelencer,freelencer.updateFreelencer)
// get freelencer
router.get('/get',authMiddleware,isBlocked,isVerified,isFreelencer,freelencer.getFreelencer)
// apply for project
router.put('/apply/:id',authMiddleware,isBlocked,isVerified,isFreelencer,freelencer.applyProject)

export default router ;