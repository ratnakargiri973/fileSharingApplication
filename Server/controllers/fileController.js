import fileModel from "../model/fileModel.js";
import 'dotenv/config';
import generateUniqueId from "../utils/generateUUID.js";
import sendDownloadEmail from "../service/emailForDownloadFile.js";


export const uploadFile = async (req, res) => {
    try {
        const {filename, path, size} = req.file;
        const uuid = generateUniqueId();
        
        const dataToSend = new fileModel({filename, path, size, uuid});
        await dataToSend.save();

        res.status(201).json({
           message: "File Upploaded Successfully",
           filename,
           uuid,
           downloadLink : `${req.protocol}://${req.get("host")}/api/file/${uuid}`
        });
    } catch (error) {
        res.status(500).json({ message: "Error in sending file", error });
    }
}

export const getAllFiles = async (req, res) => {
    try {
        const data = await fileModel.find({}, "filename uuid created");

        const dataToSend = data.map((file) => {
            return {
                ...file._doc,
                downloadLink: `${req.protocol}://${req.get("host")}/api/file/download/${file.uuid}`
            };
        });

        res.status(200).json(dataToSend);
    } catch (error) {
        res.status(500).json("There is a problem. Contact Server Admin");
    }
}

export const downloadFile = async (req, res) => {
    try {
        const file = await fileModel.findOne({uuid: req.params.uuid});
        if(!file){
            res.status(404).json({ error: "Requested file was not found on the server" })
         }
         res.download(file.path, file.filename);
    } catch (error) {
        res.status(500).json({error: "Could not download this file. Contact System Admin"});
    }
}

export const fileDownloadEmail = async (req, res) => {
    try {
        const {email, uuid} = req.body;

        if(!email || !uuid) res.status(404).json({ error: "UUID & Email are required" });

        const file = await fileModel.findOne({uuid});

        if(!file){
            res.status(404).json({ error: "Requested file was not found on the server" })
         }
         
         const downloadLink = `${req.protocol}://${req.get("host")}/api/file/download/${file.uuid}`

         const mailOptions = {
            from: process.env.USER_EMAIL,
            to: email,
            subject: "Email Download Link",
            text: "Here's your download link: " + downloadLink,
         html:
           "<h3>Here's your download link: <a href='" +
           downloadLink +
           "'>Download File </a></h3>",
          };

          await sendDownloadEmail(mailOptions);

          res.json({ message: "Email sent successfully" });
    } catch (error) {
        res.status(500).json({ error: "Error in sending email" });  
    }
}

