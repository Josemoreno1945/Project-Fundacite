import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
    destination: path.resolve('uploads'),
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Nombre único
    }
});

const upload = multer({ storage });

export default upload;
