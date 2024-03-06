import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import cookieParser from "cookie-parser"
import errorHandler from './middlewares/errorHandler.js'
import dbConnect from './config/dbConnect.js'
import userRouter from './routes/user.js'

// init
dotenv.config()
const app = express()
const PORT = process.env.PORT || 5000
const HOST = "127.0.0.1"
dbConnect()

// middlewares
app.use(cors({credentials: true, origin: '*'}))
app.use(express.json({limit: '100mb'}))
app.use(express.urlencoded({limit: '100mb', extended: false}))
app.use(cookieParser())

// routers

app.use('/api/user',userRouter)



// error middlewares
app.use(errorHandler)

// Start server
app.listen(PORT,HOST, () => {
    console.log(`the server is running on  http://${HOST}:${PORT}`)
})