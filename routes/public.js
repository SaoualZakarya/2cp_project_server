import express from 'express'
import user from '../controllers/public.js'
const router = express.Router()

// get single user 
router.get('/:id',user.getUser)



export default router ;