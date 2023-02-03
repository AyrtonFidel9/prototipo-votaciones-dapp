import multer from "multer";

const TypesFilter = (req, file, cb) => {
    if (file.mimetype.includes('csv') || file.mimetype.includes('vnd.ms-excel') 
    ) {
        cb(null, true);
    } else {
        req.fileValidationError = 'Solo se aceptan archivos con formato csv';
        cb(null, false, req.fileValidationError);
    }
}


const uploadFileCSV = multer({
    storage: multer.memoryStorage(),
    fileFilter: TypesFilter
});

export { uploadFileCSV };