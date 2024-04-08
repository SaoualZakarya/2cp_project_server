import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import cookieParser from "cookie-parser"
import errorHandler from './middlewares/errorHandler.js'
import dbConnect from './config/dbConnect.js'
import morgan from 'morgan'
import fs from 'fs';
// import http from 'http';
// import {Server} from 'socket.io'




// routes
import authRouter from './routes/auth.js'
import adminRouter from './routes/admin.js'
import userRouter from './routes/user.js'
import clientRouter from './routes/client.js'
import freelencerRouter from './routes/freelencer.js'

// init
dotenv.config()
const app = express()
const PORT = process.env.PORT || 5000
const HOST = "127.0.0.1"
dbConnect()

// Middleware to log requests
app.use((req, res, next) => {
    const logStream = fs.createWriteStream('./utils/log.txt', { flags: 'a' });
    logStream.write(`[${new Date().toISOString()}] ${req.ip} - ${req.method} ${req.originalUrl}\n`);
    logStream.end();
    next();
});

// middlewares
app.use(cors({credentials: true, origin: '*'}))
app.use(express.json({limit: '100mb'}))
app.use(express.urlencoded({limit: '100mb', extended: false}))
app.use(cookieParser())
app.use(morgan('dev'))
// routers

app.use('/api/auth',authRouter)

app.use('/api/admin',adminRouter)

app.use('/api/user',userRouter)

app.use('/api/client',clientRouter)

app.use('/api/freelencer',freelencerRouter)

// error middlewares
app.use(errorHandler)

// Start server
app.listen(PORT,HOST, () => {
    console.log(`the server is running on  http://${HOST}:${PORT}`)
})