import multer from "multer";
import path from 'path';

const __dirname = process.cwd();

const TypesFilter = (req, file, cb) => {
    if (file.mimetype.includes('csv')
    ) {
        cb(null, true);
    } else {
        req.fileValidationError = 'Solo se aceptan imagenes con formato csv';
        cb(null, false, req.fileValidationError);
    }
}

const uploadFileCSV = multer({
    storage: multer.memoryStorage(),
    fileFilter: TypesFilter
});

export { uploadFileCSV };