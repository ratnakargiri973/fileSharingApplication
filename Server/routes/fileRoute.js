import express from 'express'
import { downloadFile, fileDownloadEmail, getAllFiles, uploadFile } from '../controllers/fileController.js';
import upload from '../middleware/multer.js';

const fileRouter = express.Router();

fileRouter.post('/upload', upload.single('file'), uploadFile);
fileRouter.get('/getAllFiles', getAllFiles);
fileRouter.get('/download/:uuid', downloadFile);
fileRouter.post('/sendDownloadEmail', fileDownloadEmail)

export default fileRouter;