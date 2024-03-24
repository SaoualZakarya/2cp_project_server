import express from 'express'
import client from '../controllers/client.js'
import {authMiddleware,isBlocked,isVerified} from '../middlewares/authMiddleware.js'
const userRouter = express.Router()

// get client 
userRouter.get('/data/:id', authMiddleware,isBlocked,isVerified,client.getClient)

// create project
userRouter.post('/project/create',authMiddleware,isBlocked,isVerified,client.createProject)

// get user projects 
userRouter.get('/projects/all',authMiddleware,isBlocked,isVerified,client.getUserProjects)

// get single project
userRouter.get('/project/get/:id',authMiddleware,isBlocked,isVerified,client.getSingleUserProject)

// update project 
userRouter.put('/project/update/:id',authMiddleware,isBlocked,isVerified,client.updateProject)

// delete single project
userRouter.delete('/project/delete/:id',authMiddleware,isBlocked,isVerified,client.deleteSingleUserProject)

// get single project
userRouter.put('/project/status/:id',authMiddleware,isBlocked,isVerified,client.updateProjectStatus)



export default userRouter ;