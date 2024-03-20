import { cloudinaryUploadImg, cloudinaryRemoveImg } from "../utils/cloudinary";
import fs from 'fs';

// Handle upload image functionality
const uploadImage = async (req, res,next) => {
    try {
        const uploader = (path) => cloudinaryUploadImg(path);
        const file = req.file; 
        if (!file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }
        const { path } = file;
        const newPath = await uploader(path);
        fs.unlinkSync(path);
        res.json({ image: newPath });
    } catch (err) {
        next(err);
    }
};

// Handle delete image functionality
const deleteImage = async (req, res,next) => {
    const { id } = req.params;
    try {
        await cloudinaryRemoveImg(id, "images");
        res.json({ message: "Image deleted successfully", id: id });
    } catch (err) {
        next(err)
    }
};

export {
    uploadImage,
    deleteImage
};
