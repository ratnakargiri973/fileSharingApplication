import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import mongoose from 'mongoose';
import fileRouter from './routes/fileRoute.js';

const port = process.env.PORT;
const MONGO_URL = process.env.MONGO_URL;
const DB = process.env.DB;


const app = express();
app.use(cors());
app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.use('/api/file', fileRouter);

mongoose
.connect(MONGO_URL, {dbName:DB})
.then(()=>{
    app.listen(port, ()=>{
        console.log(`Server is running on the port ${port}`);
    })
})
.catch((err)=>{
        console.error('Failed to connect to mongodb', err);
});

