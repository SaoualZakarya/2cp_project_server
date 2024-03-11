import express from 'express'
import admin from '../controllers/admin.js'
import authMiddleware from '../middlewares/authMiddleware.js'

const adminRouter = express.Router()

// get all users for admin
adminRouter.get('/all_users',authMiddleware,admin.getUsers)
// get single user 
adminRouter.get('/user/:id',authMiddleware,admin.getUser)
// block user by admin
adminRouter.put('/block/:id',authMiddleware,admin.blockUser);
// deblock user by admin
adminRouter.put('/deblock/:id',authMiddleware,admin.deBlockUser);



export default adminRouter ;