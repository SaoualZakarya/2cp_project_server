import express from 'express'
import stripe from '../controllers/payment.js'

const router = express.Router() ;

// Create account on stripe for the freelencer 
router.post('/create-stripe-account',stripe.joinUs)

router.post('/create-stripe-checkout-session/:id',stripe.createCheckoutSession)

 //  stripe listen --forward-to localhost:4000/api/payment/webhook

router.post('/webhook',stripe.createReservationWebhook)

export default router ;