import express from 'express'
import auth from '../controllers/auth.js'

const userRouter = express.Router()

// Create account without google
userRouter.post('/sign-up',auth.createUser)
// Create account with google
userRouter.post('/sign-up/google',auth.createUserWithGoogle)

// Login 
userRouter.post('/sign-in',auth.loginUser)
// Login with google
userRouter.post('/sign-in/google',auth.loginUserWithGoogle)

// logout 
userRouter.get('/logout',auth.logoutUser)

export default userRouter ;