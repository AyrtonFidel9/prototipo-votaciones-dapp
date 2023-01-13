import multer from "multer";
import path from 'path';

const __dirname = process.cwd();

const pdfTypesFilter = async (req, file, cb) => {
    if (file.mimetype.includes('application/pdf')) {
        cb(null, true);
    } else {
        req.fileValidationError = 'Solo se aceptan archivos de formato: PDF';
        cb(null, false, req.fileValidationError);
    }
}

const storage = multer.diskStorage({
    filename: (req, file, cb) => {
        req.body[file.fieldname] = `${Date.now()}-${file.originalname}`;
        cb(null, `${Date.now()}-${file.originalname}`, req);
    },
    destination: path.join(__dirname, `/app/public/docs/inscripcion/`),
});

export const uploadDocs = multer({
    storage: storage,
    fileFilter: pdfTypesFilter
});
