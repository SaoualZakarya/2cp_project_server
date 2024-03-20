import cloudinary from 'cloudinary'
import dotenv from 'dotenv'
dotenv.config()

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

// upload image to cloudinary
const cloudinaryUploadImg = async (fileToUpload) => {
    return new Promise ((resolve)=>{
        cloudinary.uploader.upload(fileToUpload,(result, error)=>{
            resolve({
                url: result.secure_url,
                asset_id:result.asset_id,
                public_id:result.public_id
            })
        })
    })
}

// remove image from cloudinary
const cloudinaryRemoveImg = async (fileToDelete) => {
    return new Promise ((resolve)=>{
        cloudinary.uploader.destroy(fileToDelete,(result, error)=>{
            resolve({
                url: result.secure_url,
                asset_id:result.asset_id,
                public_id:result.public_id
            })
        })
    })
}
export {cloudinaryUploadImg,cloudinaryRemoveImg}