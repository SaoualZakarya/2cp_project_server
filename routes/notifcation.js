import express from 'express'
import {authMiddleware,isBlocked,isVerified} from '../middlewares/authMiddleware.js'
import notification from '../controllers/notification.js';

const router = express.Router()

// get all notificaton for the user 
router.get('/all',authMiddleware,isBlocked,isVerified,notification.getAllNotification)
// update notificaton status 
router.put('/:id',authMiddleware,isBlocked,isVerified,notification.checkNotification)


export default router ;