import express from 'express'
import client from '../controllers/client.js'
import {authMiddleware,isBlocked,isVerified} from '../middlewares/authMiddleware.js'
const userRouter = express.Router()

// create project
userRouter.post('/project/create',authMiddleware,isBlocked,isVerified,client.createProject)

// get user projects 
userRouter.get('/projects',authMiddleware,isBlocked,isVerified,client.getUserProjects)

// get single project
userRouter.get('/project/:id',authMiddleware,isBlocked,isVerified,client.getSingleUserProject)

// update project 
userRouter.put('/project/:id',authMiddleware,isBlocked,isVerified,client.updateProject)

// delete single project
userRouter.delete('/project/:id',authMiddleware,isBlocked,isVerified,client.deleteSingleUserProject)


export default userRouter ;