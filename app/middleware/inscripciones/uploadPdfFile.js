import multer from "multer";
import path from 'path';
import fs from "fs";

const __dirname = process.cwd();

const pdfTypesFilter = (req, file, cb) => {
    if (file.mimetype.includes('application/pdf')
    ) {
        cb(null, true);
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
    destination: fs.mkdir(path.join(__dirname, `/app/public/docs/inscripcion/${req.body.id}`)),
});

const uploadFile = multer({
    storage: storage,
    fileFilter: pdfTypesFilter
});

export { uploadPdfFile };



try {
    await fs.mkdir(salesTotalsDir);
  } catch {
    console.log(`${salesTotalsDir} already exists.`);
  }