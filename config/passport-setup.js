import passport from 'passport'
import GoogleStrategy from 'passport-google-oauth20'

passport.use(new GoogleStrategy({
    clientID: process.env.CLIENT_ID,
    clientSECRET: process.env.CLIENT_SECRET
}),()=>{
    // passport callback function 
});