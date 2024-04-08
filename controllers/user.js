import User from '../models/user.js'
import generateUniqueToken from '../utils/generateUniqueToken.js'
import sendEmail from './sendEmail.js'

// update user profile
const updateProfile = async (req,res,next) => {
    const {photo,description,mobile} = req.body  
    try{
        const userId = req.user._id
        const updatedUser = await User.findByIdAndUpdate(userId,{
            photo,description,mobile
        },{
            new:true
        })
        res.json({success:true,message:"User updated successfully"})
    }catch(err){
        next(err)
    }
}

const sendVerificationEmail = async (req, res) => {
    const userId = req.user._id; 

    try {

        const verificationToken = generateUniqueToken;
        const tokenExpiration = Date.now() + 30 * 60 * 1000; // 30 minutes 

        await User.findByIdAndUpdate(userId, {
            verificationToken,
            tokenExpiration
        });

        const verificationLink = `http://${process.env.DOMAIN_NAME}/verify?token=${verificationToken}`;

        // Send verification email
        await sendEmail({
            to: req.user.email,
            subject: 'Account Verification for workwave freelencing platform ',
            text: `Please click the following link to verify your account: ${verificationLink}`,
            html: `<p>Please click the following link to verify your account: <a href="${verificationLink}">${verificationLink}</a></p>`
        });

        res.status(200).json({ success: true, message: 'Verification email sent successfully' });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Failed to send verification email' });
    }
};

const verifyUser = async (req, res) => {
    const { token } = req.params; 
    const id = req.user._id;
    try {
        // Find the user in the database by ID
        const user = await User.findById(id);

        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        if (user.verificationToken === token && user.tokenExpiration >= Date.now()) {

            await User.findByIdAndUpdate(id, { verified: true, verificationToken: null, tokenExpiration: null });

            res.status(200).json({ success: true, message: 'Account verified successfully' });
        } else {
            res.status(400).json({ success: false, message: 'Invalid or expired verification token' });
        }
    } catch (err) {
        res.status(500).json({ success: false, message: 'Failed to verify account' });
    }
};


export default {updateProfile,sendVerificationEmail,verifyUser}