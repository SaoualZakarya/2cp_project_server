import express from 'express'
import client from '../controllers/client.js'
import {authMiddleware,isBlocked,isClient,isVerified} from '../middlewares/authMiddleware.js'
const router = express.Router()

// // get client 
// router.get('/data/:id', authMiddleware,isBlocked,isVerified,client.getClient)

// create project
router.post('/project/create',authMiddleware,isBlocked,isVerified,isClient,client.createProject)
// get user projects 
router.get('/projects/all',authMiddleware,isBlocked,isVerified,isClient,client.getUserProjects)
// get single project
router.get('/project/get/:id',authMiddleware,isBlocked,isVerified,client.getSingleUserProject)
// update project 
router.put('/project/update/:id',authMiddleware,isBlocked,isVerified,client.updateProject)
// delete single project
router.delete('/project/delete/:id',authMiddleware,isBlocked,isVerified,client.deleteSingleUserProject)
// get single project
router.put('/project/status/:id',authMiddleware,isBlocked,isVerified,client.updateProjectStatus)
// accept freelencer in project 
router.put('/project/participants/accept/:id',authMiddleware,isBlocked,isVerified,client.acceptFreelancerInProject)
// refuse freelencer in project 
router.put('/project/participants/refuse/:id',authMiddleware,isBlocked,isVerified,client.canceledFreelancerInProject)
// switch role into freelencer
router.put('/freelencer',authMiddleware,isBlocked,isVerified,client.switchIntoFreelencer)

// Service

// apply for service
router.put('/service/apply/:id',authMiddleware,isBlocked,isVerified,client.applyForService)
// apply for service
router.get('/services/accepted',authMiddleware,isBlocked,isVerified,client.getServiceAccepted)
// apply for service
router.get('/services/refused',authMiddleware,isBlocked,isVerified,client.getServiceRefused)
// get single service
router.get('/service/:id',authMiddleware,isBlocked,isVerified,client.getSingleService)



// get all services with filters
router.get('/services',authMiddleware,isBlocked,isVerified,client.getServices)


export default router ;