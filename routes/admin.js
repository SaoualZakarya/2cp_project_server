import express from 'express'
import admin from '../controllers/admin.js'
import {authMiddleware,isAdmin} from '../middlewares/authMiddleware.js'

const adminRouter = express.Router()

// get all users for admin
adminRouter.get('/all_users',authMiddleware,isAdmin,admin.getUsers)
// get single user 
adminRouter.get('/user/:id',authMiddleware,isAdmin,admin.getUser)
// block user by admin
adminRouter.put('/block/:id',authMiddleware,isAdmin,admin.blockUser);
// deblock user by admin
adminRouter.put('/deblock/:id',authMiddleware,isAdmin,admin.deBlockUser);



export default adminRouter ;