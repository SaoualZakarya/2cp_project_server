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

// get all the project where the freelencer is accepted
router.get('/get/projects/accepted',authMiddleware,isBlocked,isVerified,isFreelencer,freelencer.getProjectsAccepted)
// get all the project where the freelencer is refused
router.get('/get/projects/canceled',authMiddleware,isBlocked,isVerified,isFreelencer,freelencer.getProjectsCanceled)
//get all existed project with filters and query params
router.get('/get/projects/exists',authMiddleware,isBlocked,isVerified,isFreelencer,freelencer.getProjectsExists)
//get single project
router.get('/get/project/:id',authMiddleware,isBlocked,isVerified,isFreelencer,freelencer.getSingleProject)


// switch role into user 
router.put('/client',authMiddleware,isBlocked,isVerified,isFreelencer,freelencer.switchIntoUser)

// create service
router.post('/create/service',authMiddleware,isBlocked,isVerified,isFreelencer,freelencer.createService)
// update service
router.put('/update/service/:id',authMiddleware,isBlocked,isVerified,isFreelencer,freelencer.updateService)
// delete service
router.delete('/delete/service/:id',authMiddleware,isBlocked,isVerified,isFreelencer,freelencer.deleteService)
// get all the user services
router.get('/get/services/all',authMiddleware,isBlocked,isVerified,isFreelencer,freelencer.getAllFreelencerServices)
// get Service 
router.get('/get/service/:id',authMiddleware,isBlocked,isVerified,isFreelencer,freelencer.getService)
// Accept user on service 
router.put('/service/accept/:id',authMiddleware,isBlocked,isVerified,isFreelencer,freelencer.accepteUserOnService)
// Canceled user from service 
router.put('/service/refuse/:id',authMiddleware,isBlocked,isVerified,isFreelencer,freelencer.refuseUserFromService)



export default router ;
