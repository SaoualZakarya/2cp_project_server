import User from '../models/user.js'

const getUsers = async (req,res,next) =>{
    try{
        const users = await User.find();
        res.json(users);
    }catch (err){
        next(err)
    }
}



export default {getUsers}