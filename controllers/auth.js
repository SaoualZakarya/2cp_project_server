import User from '../models/user.js'
import { generateToken } from '../utils/token.js'

const createUser = async(req,res,next) =>{
    try {
        const {email,password,userName} = req.body
        const findEmail = await User.findOne({email})
        if (findEmail){
            res.json("Email already exists")
        }
        const user = await User.create({email,password,userName});
        
        const token = await generateToken(user._id);    
        
        res.cookie('token', token, {
            httpOnly:true,
            secure:true,
            maxAge: 72 * 60 * 60 * 1000, // Three days
        });
        
        res.json({
            message:"User created successfully",
            Success:true,
            _id: user._id,
            email: user.email,
            userName: user.userName,
        });

    }catch(err){
        next(err);
    }
}

const createUserWithGoogle = async (req, res,next) =>{
    try {
        const {googleId,email,userName} = req.body
        const findEmail = await User.findOne({email})
        if (findEmail){
            res.json("Email already exists")
        }
        const user = await User.create({email,googleId,userName});
        
        const token = await generateToken(user._id);    
        
        res.cookie('token', token, {
            httpOnly:true,
            secure:true,
            maxAge: 72 * 60 * 60 * 1000, // Three days
        });
        
        res.json({
            message:"User created successfully",
            Success:true,
            _id: user._id,
            email: user.email,
            userName: user.userName,
        });

    }catch(err){
        next(err);
    }
} 

const loginUser = async (req, res, next) => {
    try {
        const { email , password } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.json({ "Message": "User not found", "Success": false });
        }

        const isPasswordMatched = await user.isPasswordMatched(password);

        if (!isPasswordMatched) {
            return res.json({ "Message": "Invalid password", "Success": false });
        }

        const token = await generateToken(user._id);    

        res.cookie('token', token, {
            httpOnly:true,
            secure:true,
            maxAge: 72 * 60 * 60 * 1000, // Three days
        });

        res.json({
            _id: user._id,
            email: user.email,
            userName: user.userName,
        });

    } catch (err) {
        next(err);
    }
};


const loginUserWithGoogle = async (req, res, next) => {
    try {
        const { email , googleId } = req.body;
        const user = await User.findOne({ googleId });

        if (!user) {
            return res.json({ "Message": "User not found", "Success": false });
        }
        
        const token = await generateToken(user._id);    

        res.cookie('token', token, {
            httpOnly:true,
            secure:true,
            maxAge: 72 * 60 * 60 * 1000, // Three days
        });
        
        res.json({
            _id: user._id,
            email: user.email,
            userName: user.userName,
        });

    } catch (err) {
        next(err);
    }
};

const logoutUser = async (req, res, next) => {
  try {
    res.clearCookie('token',  {
        httpOnly: true, 
        expires: new Date(0),
    });
    res.json({ message: 'Logout successful', success: true });
  } catch (err) {
    next(err);
  }
};



export default {createUser,loginUser,createUserWithGoogle,loginUserWithGoogle,logoutUser}
