import {v2 as cloudinary} from 'cloudinary'
import dotenv from 'dotenv'
dotenv.config() 

cloudinary.config({
    cloud_name:  process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret : process.env.CLOUDINARY_API_SECRET
})

const cloudinaryUploadImg = async (fileToUpload) => {
    try {
        const result = await cloudinary.uploader.upload(fileToUpload);
        return {
            url: result.secure_url,
            asset_id: result.asset_id,
            public_id: result.public_id
        };
    } catch (error) {
        console.error(error);
    }
};

// remove image from cloudinary
const cloudinaryRemoveImg = async (fileToDelete) => {
    return new Promise ((resolve)=>{
        cloudinary.uploader.destroy(fileToDelete,(result, error)=>{
            resolve({
                url: result?.secure_url,
                asset_id:result?.asset_id,
                public_id:result?.public_id
            })
        })
    })
}
export {cloudinaryUploadImg,cloudinaryRemoveImg}