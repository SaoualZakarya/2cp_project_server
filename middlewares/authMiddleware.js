import jwt from 'jsonwebtoken'
import User from '../models/user.js'



// we use authMiddleWare to make sure the user login 
const authMiddleWare = async(req,res,next)=>{
    let token = req.cookies;
    console.log(token);
    
}


export default authMiddleWare