import { rateLimit } from 'express-rate-limit'

const limiter = rateLimit({
    windowMs: 1 * 30 * 1000, // 30 second
    max: 60, // limit each IP to 30 requests per window
    message: 'Too many requests from this IP, please try again later',
})

export default limiter ;