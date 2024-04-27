import User from '../models/user.js'
import Notifcation from '../models/notification.js'
import { generateToken } from '../utils/token.js'
import crypto from 'crypto'
import sendEmail from './sendEmail.js';
import jwt from 'jsonwebtoken'
import useragent from 'useragent';


// Regular expressions for email and password
const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,10}$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])[A-Za-z\d\W_]{7,}$/;


const createUser = async(req,res,next) =>{
    try {
        const {email,password,firstName,lastName,mobile} = req.body

        if (!emailRegex.test(email)) {
            return res.status(400).json({ error: "Invalid email address" });
        }

         // Check if email already exists
         const findEmail = await User.findOne({ email });
         if (findEmail) {
             return res.status(400).json({ error: "Email already exists" });
         }
 
         // Add more restrictions on the inputs
         const nameRegex = /^[a-zA-Z]{2,17}$/;
         const mobileRegex = /^[1-9][0-9]{8}$/;
 
         if (!mobileRegex.test(mobile)) {
             return res.status(400).json({ error: "Invalid mobile number" });
         }

         if (!nameRegex.test(firstName)) {
            return res.status(400).json({ error: "Invalid first name" });
        }

        if (!nameRegex.test(lastName)) {
            return res.status(400).json({ error: "Invalid last name" });
        }
 
         // Password must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number
         if (!passwordRegex.test(password)) {
             return res.status(400).json({ error: "Invalid password format" });
         }

         // Create user if all input restrictions are satisfied
        const user = await User.create({ email, password, firstName, lastName, mobile });

        const token = await generateToken(user._id);    
        
        res.cookie('token', token, {
            httpOnly:true,
            secure:true,
            maxAge: 72 * 60 * 60 * 1000, // Three days
            domain: 'localhost'
        });
        
        res.json({
            message:"User created successfully",
            _id: user._id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            mobile:user.mobile,
            verified:user.verified,
            role:user.role
        });

    }catch(err){
        next(err);
    }
}

const loginUser = async (req, res, next) => {
    try {
        const { email , password } = req.body;

        if (!emailRegex.test(email)) {
            return res.status(400).json({ error: "Invalid email address" });
        }

        // Password must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number
        if (!passwordRegex.test(password)) {
            return res.status(400).json({ error: "Invalid password format" });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.json({ Message: "User not found", Success: false });
        }

        const isPasswordMatched = await user.isPasswordMatched(password);

        if (!isPasswordMatched) {
            return res.json({ Message: "Invalid password", Success: false });
        }

        const token = await generateToken(user._id); 
        
        // Create the notification of login

        const userAgentString = req.headers['user-agent'];
        const agent = useragent.parse(userAgentString);
        const notification = await Notifcation.create({
            message : `Logged in from ${agent.device.toString()} using ${agent.toAgent()}`,
            user : user._id
        })

        res.cookie('token', token, {
            httpOnly:true,
            secure:true,
            maxAge: 72 * 60 * 60 * 1000, // Three days
            domain: 'localhost'
        });

        res.json({
            message:"User login successfully",
            _id: user._id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            mobile:user.mobile,
            verified:user.verified,
            role:user.role
        });

    } catch (err) {
        next(err);
    }
};

const createUserWithGoogle = async (req, res,next) =>{
    try {
        const {googleId,email,userName} = req.body
        const findEmail = await User.findOne({email})
        if (findEmail){
            res.json("Email already exists")
        }
        // the account will be verified directly
        const user = await User.create({email,googleId,userName,verified:true});

        const token = await generateToken(user._id);    
        
        res.cookie('token', token, {
            httpOnly:true,
            secure:true,
            maxAge: 72 * 60 * 60 * 1000, // Three days
            domain: 'localhost'
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

const loginUserWithGoogle = async (req, res, next) => {
    try {
        const { googleId } = req.body;
        const user = await User.findOne({ googleId });

        if (!user) {
            return res.json({ "Message": "User not found", "Success": false });
        }
        
        const token = await generateToken(user._id);    

        res.cookie('token', token, {
            httpOnly:true,
            secure:true,
            maxAge: 72 * 60 * 60 * 1000, // Three days
            domain: 'localhost'
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


// generate forgot password token
const forgotPasswordToken = async(req,res,next)=>{
    const {email} = req.body
    const user = await User.findOne({email})
    if(!user) return res.json({message:'user not found with this email'})
    try{
        const token = await user.createPasswordResetToken();
        // we use this to save the -passwordResetExpires- and -passwordResetToken-
        await user.save()
        
        const resetURL = `Please follow this link to reset your password. <br> This link is valid 10 minutes from now <br> 
        <a href='http://localhost:3000/api/user/reset-password/${token}'> Click here </a> <br> 
        Don't forget you have just one time to change the password by day `
        const data = {
            to : email,
            text : 'Hey User',
            from : '<ecommerceShop1900gmail.com>',
            subject : ' Forgot password link ',
            htm : resetURL
        }
        sendEmail(data)
        res.json({
            success: true,
            message: "Verification email sent successfully"
        })
    }catch(err) {next(err) }
}

// reset password
const resetPassword = async (req,res)=>{
    const {token} = req.params
    const {password} = req.body
    const hashedToken = crypto.createHash('sha256').update(token).digest('hex')
    const user = await User.findOne({
        passwordResetToken:hashedToken,
        // --gt-- mean that the time we chose for the token to expire is greater than  the time now 
        passwordResetExpires: {$gt:Date.now()},
        passwordChangedAt: { $lt: new Date(Date.now() - 24 * 60 * 60 * 1000) }
    })
    if(!user){
        return res.json('Token expired , or your dapassed the limited chanse offred for you to change the password , Please try tomorow')
    }    
    user.password = password
    user.passwordResetToken = undefined
    user.passwordResetExpires = undefined
    user.passwordChangedAt = Date.now()
    // Format date to a user-friendly string
    const formattedPasswordChangedAt = new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
    }).format(user.passwordChangedAt);

    await user.save()
    res.json(user)
}


const checkLogin = async (req, res, next) => {
    let token = req.cookies.token;
    try {
        if(!token) {
            res.json({message:"there is no token",success:false})
        }
        // verify the token 
        const decoded = await jwt.verify(token,process.env.SECRET_JWT)
        if (!decoded){
            res.json({message:"Invalide token",success:false})
        }
        res.json({message:"Your token has been verified succefully",success:true})
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



export default {createUser,loginUser,checkLogin,forgotPasswordToken,resetPassword,createUserWithGoogle,loginUserWithGoogle,logoutUser}
