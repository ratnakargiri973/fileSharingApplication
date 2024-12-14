import multer from "multer";
import path from 'path';
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, "../uploads"));
    },
    filename: (req, file, cb) => {
        const fileName = `${Date.now()} - ${Math.round(Math.random() * 1000000)}`;
        const ext = `${path.extname(file.originalname)}`;
        cb(null, fileName + ext);
    }
});

const upload = multer({
    storage,
    limits: {fileSize: 1024 * 1024}
});

export default upload;