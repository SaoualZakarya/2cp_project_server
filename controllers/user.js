import User from '../modules/user.js'
import Card from '../modules/creditCard.js'
import generateUniqueToken from '../utils/generateUniqueToken.js'
import sendEmail from './sendEmail.js'


// update user profile
const updateProfile = async (req,res,next) => {
    const {photo,description,portfolio_url} = req.body  
    try{
        const userId = req.user._id
        // Check the length of the description before updating
        if ( description.length > 500) {
            return res.status(400).json({ success: false, message: "Description exceeds maximum length of 500 characters" });
        }
        const updatedUser = await User.findByIdAndUpdate(userId,{
            photo,description,portfolio_url
        },{
            new:true
        })
        res.json({success:true,message:"User updated successfully"})
    }catch(err){
        next(err)
    }
}

// get user 
 
const getUser = async (req,res,next) =>{
    const userId = req.user._id
    try{
        const user = await User.findById(userId).select('firstName lastName email mobile role verified')
        if(!user){
            return res.status(404).json({success:false,message:"User not found"})
        }
        res.json({success:true,data:user})
    } catch(e){
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

const createCard = async (req,res,next) => {
    const id = req.user._id;
    const { cardholderName,type, cardNumber, expirationDate, cvv } = req.body;

    // Check if cardholderName contains only alphabets
    if (!/^[A-Za-z\s]+$/.test(cardholderName)) {
        return res.status(400).json({ success: false, message: 'Cardholder name should contain only alphabets' });
    }

    // Check if cardNumber is exactly 16 digits
    if (!/^\d{16}$/.test(cardNumber)) {
        return res.status(400).json({ success: false, message: 'Card number should be exactly 16 digits' });
    }

    // Check if cvv is exactly 4 digits
    if (!/^\d{4}$/.test(cvv)) {
        return res.status(400).json({ success: false, message: 'CVV should be exactly 4 digits' });
    }

    const newCard = new Card({
        cardholderName,
        cardNumber,
        expirationDate,
        cvv,
        user:id,
        type
    });

    try {
        const savedCard = await newCard.save();
        res.json({ success: true, message: 'Card created successfully' });
    } catch (error) {
        next(error)
    }
}

const updateCard = async (req,res,next) => {
    const id = req.params.id;
    const { cardholderName,type, cardNumber, expirationDate, cvv } = req.body;

    // Check if cardholderName contains only alphabets
    if (!/^[A-Za-z\s]+$/.test(cardholderName)) {
        return res.status(400).json({ success: false, message: 'Cardholder name should contain only alphabets' });
    }

    // Check if cardNumber is exactly 16 digits
    if (!/^\d{16}$/.test(cardNumber)) {
        return res.status(400).json({ success: false, message: 'Card number should be exactly 16 digits' });
    }

    // Check if cvv is exactly 4 digits
    if (!/^\d{4}$/.test(cvv)) {
        return res.status(400).json({ success: false, message: 'CVV should be exactly 4 digits' });
    }
    try {
        const updatedCard = await Card.findByIdAndUpdate(id,{
            cardholderName,
            cardNumber,
            expirationDate,
            cvv,
            type
        },{new:true});
        res.json({ success: true, message: 'Card updated successfully' });
    } catch (error) {
        next(error)
    }
}

const getCard = async (req,res,next) =>{
    const id = req.user._id;
    try {
        const card = await Card.findOne({user:id});
        res.json({ success: true, card });
    } catch (error) {
        next(error)
    }
}

const deleteCard = async (req,res,next) => {
    const id = req.params.id;
    try {
        const deletedCard = await Card.findByIdAndDelete(id);
        res.json({ success: true, message: 'Card deleted successfully' });
    } catch (error) {
        next(error)
    }
}

export default {updateProfile,getUser,sendVerificationEmail,getCard,deleteCard,verifyUser,createCard,updateCard}