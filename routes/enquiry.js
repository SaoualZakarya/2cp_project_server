import express from 'express'
import {authMiddleware,isBlocked,isAdmin,isVerified} from '../middlewares/authMiddleware.js'
import enquiry from '../controllers/enquiry.js'


const router = express.Router()

// create  Enquiry
router.post('/create' ,authMiddleware,isBlocked,isVerified ,enquiry.createEnquiry)

//udpate  Enquiry
router.put('/:id',authMiddleware,isBlocked,isVerified,isAdmin ,enquiry.updateEnquiry)

// delete  Enquiry
router.delete('/:id',authMiddleware,isBlocked,isVerified,isAdmin ,enquiry.deleteEnquiry)

// get all Enquiry
router.get('/all',authMiddleware,isBlocked,isVerified ,isAdmin,enquiry.getAllEnquiry)

// get  Enquiry
router.get('/:id',authMiddleware,isBlocked,isVerified,isAdmin ,enquiry.getEnquiry)

export default router ;