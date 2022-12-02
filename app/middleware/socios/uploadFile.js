import multer from "multer";

const imageTypesFilter = (req, file, cb) => {
    if (file.originalname.includes('.jpg') ||
        file.originalname.includes('.jpeg') ||
        file.originalname.includes('.png')
    ) {
        cb(null, true);
    } else {
        cb('Solo se aceptan imagenes con formato, jpg, jpe y png', false);
    }
}

const storage = multer.diskStorage({
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
    destination: path.join(__dirname, 'app/public/images'),
});

const uploadFile = multer({
    storage,
    imageTypesFilter
});

export { uploadFile };