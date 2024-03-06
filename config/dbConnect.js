import mongoose from 'mongoose'

const dbConnect = async () => {
    try{
        const connect = await mongoose.connect(process.env.MONGODB_URL)
        console.log('database connected succefully')
    }catch(err){
        console.log('database error' + err)
    }
}

export default dbConnect