import { cloudinaryUploadImg, cloudinaryRemoveImg } from "../utils/cloudinary.js";
import fs from 'fs';

// Handle upload image functionality
const uploadImage = async (req, res, next) => {
    try {
        console.log(req.file);
        const file = req.file; 
        if (!file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }
        const { path: originalPath } = file; 
        const newPath = await cloudinaryUploadImg(originalPath)
        console.log(newPath);
        fs.unlinkSync(originalPath); 
        res.json({ image: newPath });
    } catch (err) {
        next(err);
    }
};

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
    deleteImage
}
