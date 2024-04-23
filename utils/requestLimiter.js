import { rateLimit } from 'express-rate-limit'

const limiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minutes
    max: 30, // limit each IP to 30 requests per window
    message: 'Too many requests from this IP, please try again later',
})

export default limiter ;