import jwt from 'jsonwebtoken'
import User from '../models/user.js'

// we use authMiddleWare to make sure the user login 
const authMiddleware = async(req,res,next)=>{
    let token = req.cookies;
    console.log(token);
    next()
}

const adminMiddleware = async (req,res,next)=>{
    let user = req.user
    if (!user.role === 'admin'){
        res.json("You are not admin")
    }
    next()
}

const freelencerMiddleware = async (req,res,next)=>{
    let user = req.user
    if (!user.role === 'freelencer'){
        res.json("You are not freelencer")
    }
    next()
}

export default authMiddleware