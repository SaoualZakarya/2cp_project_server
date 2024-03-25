import { cloudinaryUploadImg, cloudinaryRemoveImg } from "../utils/cloudinary.js";
import fs from 'fs';

// Handle upload image functionality
const uploadImage = async (req, res, next) => {
    try {
        const file = req.file; 
        if (!file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }
        const { path: originalPath } = file; 
        const newPath = await cloudinaryUploadImg(originalPath)
        fs.unlinkSync(originalPath); 
        res.json({ image: newPath });
    } catch (err) {
        next(err);
    }
};

// handle upload images functionnality
const uploadImages = async(req,res)=>{
    try{ 
        let urls = []
        const files  = req.files
        for(let file of files){
            const {path} = file ;
            const newPath = await cloudinaryUploadImg(path)
            urls.push(newPath)
            fs.unlinkSync(path)
        }
        const images = urls.map(file =>{
            return file
        })
         res.json(images)

    }catch(err) {
        next(err)
    }
}

// Handle delete image functionality
const deleteImage = async (req, res,next) => {
    // Here the id represent the asset_id 
    const { id } = req.params;
    try {
        await cloudinaryRemoveImg(id, "images");
        res.json({ message: "Image deleted successfully", id});
    } catch (err) {
        next(err)
    }
};

export {
    uploadImage,
    deleteImage,
    uploadImages
}
