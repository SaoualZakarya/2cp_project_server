import express from 'express'
import client from '../controllers/client.js'
import {authMiddleware,isBlocked,isVerified} from '../middlewares/authMiddleware.js'
const router = express.Router()

// get client 
router.get('/data/:id', authMiddleware,isBlocked,isVerified,client.getClient)
// create project
router.post('/project/create',authMiddleware,isBlocked,isVerified,client.createProject)
// get user projects 
router.get('/projects/all',authMiddleware,isBlocked,isVerified,client.getUserProjects)
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

// get all services with filters
router.get('/services',authMiddleware,isBlocked,isVerified,client.getServices)


export default router ;