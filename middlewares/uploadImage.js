import multer from 'multer';
import path from 'path';
import sharp from 'sharp';

// Define storage and file filter
const multerStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, "../public/images"));
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, file.fieldname + '-' + uniqueSuffix + '.jpeg');
    }
});

const multerFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image')) {
        cb(null, true); // Accept the file
    } else {
        cb({ message: 'unsupported file format' }, false); // Reject the file
    }
};

// Set up multer instance for single image upload with size limit
const uploadPhoto = multer({
    storage: multerStorage,
    fileFilter: multerFilter,
    limits: {
        fileSize: 100000000 // 100 MB size limit
    }
}).single('image'); // Accept only one file with fieldname 'image'


// Middleware to resize uploaded image
const resizeProfilePicture = (req, res, next) => {
    if (!req.file) {
        return next();
    }

    const { path } = req.file;
    const resizedImagePath = path.replace('.jpeg', '-resized.jpeg');

    sharp(path)
        .resize({ width: 200, height: 200, fit: 'inside' })
        .toFormat('jpeg') 
        .jpeg({ quality: 80 })
        .toFile(resizedImagePath, (err, info) => {
            if (err) {
                next(err);
            }
            req.file.path = resizedImagePath;
            next();
        });
};


export {uploadPhoto,resizeProfilePicture};
