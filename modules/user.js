import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import crypto from 'crypto';

// Declare the Schema of the Mongo model
var userSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:[true, 'FirstName is required'],
        match: [/^[a-zA-Z]{2,17}$/, "{VALUE} is not a valid firstName"]
    },
    lastName:{
        type:String,
        required:[true, 'lastName is required'],
        match: [/^[a-zA-Z]{2,17}$/, "{VALUE} is not a valid lastName"]
    },
    email:{
        type:String,
        required:[true,"Email is required"],
        unique:[true,"Email is required"],
        match: [/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,10}$/,"{VALUE} is not valid email address"], 
    },
    mobile:{
        type:String,
        match:[/^[1-9][0-9]{8}$/,"{VALUE} is not valid mobile number"],
        required:[true,"Mobile is required"],
    },
    // must contain at least 1 uppercase letter , 1 lowercase letter and 1 number
    password:{
        type:String,
        match:[/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])[A-Za-z\d\W_]{7,}$/,"{VALUE} is not valid password"]
    },
    googleId:{
        type:String,
    },
    role:{
        type:String,
        default:"user",
        enum:["admin", "freelencer","user"],
        required:true,
    },
    photo:{
        type:String
    },
    portfolio_url:{
        type:String,
    },
    // About me
    description:{
        type:String,
        maxlength: 500,
    },
    blocked:{
        type:Boolean,
        required:true,
        default:false
    },

    // for verification of the account
    verified:{
        type:Boolean,
        required:true,
        default:false,
    },
    verificationToken:{
        type:String,
    },
    tokenExpiration:{
        type:Date,
    },
    
    // freelencer funcionnalities   
    skills: [
        {
            type: String,
        }
    ],
    certificate:[
        {
            url:{
                type:String,
            },
            asset_id:{
                type:String,
            },
            public_id:{
                type:String
            }
        }
    ],
    // For password update
    passwordChangedAt: { type: Date, default: Date.now() - (24 * 60 * 60 * 1000) },
    passwordResetToken: { type: String, default: undefined },
    passwordResetExpires: { type: Date, default: undefined },

    stripeAccountId :{
        type:String,
    }

},{
    timestamps:true
});

// to hash the password before save
userSchema.pre('save', async function(next) {
    if (!this.isModified('password')){
      return next()
    }else {
      // encrypt password 
      const salt = bcrypt.genSaltSync(10)
      const hashPass = bcrypt.hashSync(this.password, salt)
      this.password = hashPass
      next()
    }
})

// to check if the password matched when login user
userSchema.methods.isPasswordMatched = async function (entredPassword) {
    return await bcrypt.compare(entredPassword, this.password)
}

userSchema.methods.createPasswordResetToken = async function () {
    try{
        // generate string as reset token
        const resetToken = crypto.randomBytes(32).toString('hex')
        // We need to hash the token before store it in the data base 
        this.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex')
        this.passwordResetExpires = Date.now() + 10 * 60 * 1000 
        // we return the resest token
        return resetToken
    }catch(err){
        throw err
    }
}

//Export the model
export default mongoose.model('User', userSchema);