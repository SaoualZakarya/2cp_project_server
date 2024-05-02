import express from 'express'
import {authMiddleware,isBlocked,isVerified} from '../middlewares/authMiddleware.js'
import { webHookFunction ,createAccountStripe, createPaymentIntent } from '../controllers/payment.js'

const router = express.Router() ;

router.post('/create-stripe-account',authMiddleware,isBlocked,isVerified,createAccountStripe)

router.post('/webhook', express.raw({type: 'application/json'}),authMiddleware,isBlocked,isVerified,webHookFunction)


router.post("/create-payment-intent",authMiddleware,isBlocked,isVerified,createPaymentIntent)

export default router ;