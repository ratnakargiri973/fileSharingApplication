import nodemailer from 'nodemailer';
import 'dotenv/config';

const EMAIL = process.env.USER_EMAIL;
const PASS = process.env.USER_PASSWORD;

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth:{
        user: EMAIL,
        pass: PASS
    }
});

export default async function sendDownloadEmail(mailOptions){
    try {
        await transporter.sendMail(mailOptions)
    } catch (error) {
        console.log(error)
    }
}



