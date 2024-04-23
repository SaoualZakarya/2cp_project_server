import express from 'express'
import auth from '../controllers/auth.js'

const authRouter = express.Router()

// Create account without google
authRouter.post('/sign-up',auth.createUser)
// Create account with google
authRouter.post('/sign-up/google',auth.createUserWithGoogle)

// Login 
authRouter.post('/sign-in',auth.loginUser)
// Login with google
authRouter.post('/sign-in/google',auth.loginUserWithGoogle)

//forgot password token
authRouter.post('/forgot-password-token',auth.forgotPasswordToken)
//reset password 
authRouter.put('/reset-password/:token',auth.resetPassword)

// logout 
authRouter.get('/logout',auth.logoutUser)

export default authRouter ;