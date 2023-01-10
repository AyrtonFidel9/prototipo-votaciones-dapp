import multer from "multer";
import path from 'path';
import fs from "fs";

const __dirname = process.cwd();

const pdfTypesFilter = async (req, file, cb) => {
    if (file.mimetype.includes('application/pdf')
    ) {
        cb(null, true);
        try {
            fs.mkdir(path.join(__dirname, `/app/public/docs/inscripcion/${req.body.id}`));
        } catch {
            console.log(`${salesTotalsDir} already exists.`);
        }
    } else {
        req.fileValidationError = 'Solo se aceptan archivos de formato: PDF';
        cb(null, false, req.fileValidationError);
    }
}



const storage = multer.diskStorage({
    filename: (req, file, cb) => {
        req.body.formulario = `${Date.now()}-${file.originalname}`;
        cb(null, `${Date.now()}-${file.originalname}`, req);
    },
    destination: path.join(
        __dirname, `/app/public/docs/inscripcion/${req.body.id}`, (err) => {
            if (err){
                return console.error(err);
            }
        }
    ),
});

export const uploadDocs = multer({
    storage: storage,
    fileFilter: pdfTypesFilter
}).array('uploadedDocs',2);



