import User from '../models/user.js'
import { generateToken } from '../utils/token.js'


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
        });
        
        res.json({
            message:"User created successfully",
            _id: user._id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            mobile:user.mobile,
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
            return res.json({ "Message": "Invalid password", "Success": false });
        }

        const token = await generateToken(user._id);    

        res.cookie('token', token, {
            httpOnly:true,
            secure:true,
            maxAge: 72 * 60 * 60 * 1000, // Three days
        });

        res.json({
            message:"User login successfully",
            _id: user._id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            mobile:user.mobile,
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
