import express from 'express'
import auth from '../controllers/user.js'

const userRouter = express.Router()

// Login 
userRouter.post('/sign-up',auth.createUser)
// Login with google



userRouter.post('/sign-in',auth.loginUser)

// logout 
userRouter.get('/logout',)

export default userRouter ;