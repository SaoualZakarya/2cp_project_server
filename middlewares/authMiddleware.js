import jwt from 'jsonwebtoken'
import User from '../models/user.js'

// we use authMiddleWare to make sure the user login 
const authMiddleware = async(req,res,next)=>{
    let token = req.cookies.token;
    try{
        if(!token) {
            res.json({message:"there is no token",success:false})
        }
        // verify the token 
        const decoded = await jwt.verify(token,process.env.SECRET_JWT)
        if (!decoded){
            res.json({message:"Invalide token",success:false})
        }
        // get the user
        const user = await User.findById(decoded.id)
        req.user = user
        next()
    }catch(err){
        next(err);
    }
}

const isAdmin = async (req,res,next)=>{
    let user = req.user
    if (!user.role === 'admin'){
        res.json("You are not admin")
    }
    next()
}

const isFreelencer = async (req,res,next)=>{
    let user = req.user
    if (!user.role === 'freelencer'){
        res.json("You are not freelencer")
    }
    next()
}

const isBlocked = async (req,res,next)=>{
    const user = req.user
    if(user.blocked){
        res.status(403).json({success:false,message:"Your account has been blocked"})
    }
    next()
}

const isVerified = async (req,res,next)=>{
    const user = req.user
    if(!user.verified){
        res.status(403).json({success:false,message:"You should verify your account"})
    }
    next()
}



export {authMiddleware,isFreelencer,isAdmin,isVerified,isBlocked}