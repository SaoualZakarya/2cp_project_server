import jwt from 'jsonwebtoken'
export const generateToken =async(id)=>{
    let token = await jwt.sign({id},process.env.SECRET_JWT,{expiresIn:'2d'})
    return token ;
} 