import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

// Declare the Schema of the Mongo model
var userSchema = new mongoose.Schema({
    userName:{
        type:String,
        required:[true, 'UserName is required'],
        unique:true,
        match: [/^[a-zA-Z][a-zA-Z0-9_]{3,17}$/, "{VALUE} is not a valid userName"]
    },
    email:{
        type:String,
        required:true,
        unique:[true,"Email is required"],
        match: [/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,10}$/,"{VALUE} is not valid email address"], 
    },
    mobile:{
        type:String,
        match:[/^[1-9][0-9]{8}$/,"{VALUE} is not valid mobile number"]
    },
    // must contain at least 1 uppercase letter , 1 lowercase letter and 1 number
    password:{
        type:String,
        // match:[/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z0-9]{8,}$/,"{VALUE} is not valid password"]
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
    // About me
    description:{
        type:String,
        maxlength: 500,
        required:false,
    },
    blocked:{
        type:Boolean,
        required:true,
        default:false
    },
    conversations:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Conversation"
        }
    ],

    // for verification purpose
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

    
    // simple user funcionnnlities
    projects:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Project'
    }],

    
    // freelencer funcionnalities 
    education:{
        type:String,
    },   
    skills: [
        {
            type: String,
        }
    ],
    experience: [
        {
            title:{
                type:String,
            },
            description:{
                type:String,
            },
            prove:{
                type:String
            }
        }
    ],
    certificate:[
        {
            link:{
                type:String,
            },
            verifiedId:{
                type:String
            }
        }
    ]

    
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

//Export the model
export default mongoose.model('User', userSchema);