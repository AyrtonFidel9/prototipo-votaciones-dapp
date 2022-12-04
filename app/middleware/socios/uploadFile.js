import multer from "multer";
import path from 'path';

const __dirname = process.cwd();

const imageTypesFilter = (req, file, cb) => {
    if (file.mimetype.includes('image/jpg') ||
        file.mimetype.includes('image/jpeg') ||
        file.mimetype.includes('image/png')
    ) {
        cb(null, true);
    } else {
        req.fileValidationError = 'Solo se aceptan imagenes con formato, jpg, jpe y png';
        cb(null, false, req.fileValidationError);
    }
}

const storage = multer.diskStorage({
    filename: (req, file, cb) => {
        req.body.imagen = `${Date.now()}-${file.originalname}`;
        cb(null, `${Date.now()}-${file.originalname}`, req);
    },
    destination: path.join(__dirname, '/app/public/images'),
});

const uploadFile = multer({
    storage: storage,
    fileFilter: imageTypesFilter
});

export { uploadFile };