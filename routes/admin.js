import express from 'express'
import admin from '../controllers/admin.js'
import authMiddleWare from '../middlewares/authMiddleware.js'

const adminRouter = express.Router()

// get all users for admin
adminRouter.get('/all_users',authMiddleWare,admin.getUsers)
// block user by admin
adminRouter.post('/block/:id')

export default adminRouter ;