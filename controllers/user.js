import User from '../models/user.js'
import { generateToken } from '../utils/token.js'

const createUser = async(req,res,next) =>{
    try {
        const {email,password,userName,mobile} = req.body
        const findEmail = await User.findOne({email})
        if (findEmail){
            res.json("Email already exists")
        }
        const user = await User.create({email,password,userName,mobile});
        res.json({"Message":"User created successfully","Success":true})
    }catch(err){
        next(err);
    }
}
const loginUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.json({ "Message": "User not found", "Success": false });
        }

        const isPasswordMatched = await user.isPasswordMatched(password);

        if (!isPasswordMatched) {
            return res.json({ "Message": "Invalid password", "Success": false });
        }

        const token = await generateToken(user._id);
        console.log(token);

        res.cookie('token', token, {
            httpOnly: true,
            // Three days
            maxAge: 72 * 60 * 60 * 1000,
        });
        res.json({
            _id: user._id,
            email: user.email,
            userName: user.userName,
            mobile: user.mobile,
        });

    } catch (err) {
        next(err);
    }
};

export default {createUser,loginUser}
